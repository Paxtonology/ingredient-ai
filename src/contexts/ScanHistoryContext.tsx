import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Ingredient {
  name: string;
  status: "healthy" | "moderate" | "harmful";
  reason: string;
}

interface Analysis {
  ingredients: Ingredient[];
  summary: string;
}

export interface ScanHistoryItem {
  id: string;
  type: "manual" | "image";
  input: string;
  analysis: Analysis;
  date: string;
}

interface ScanHistoryContextType {
  history: ScanHistoryItem[];
  addToHistory: (item: ScanHistoryItem) => void;
  clearHistory: () => void;
}

const ScanHistoryContext = createContext<ScanHistoryContextType | undefined>(undefined);

export const ScanHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("scanHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error parsing saved history:", error);
        setHistory([]);
      }
    }
  }, []);

  const addToHistory = (item: ScanHistoryItem) => {
    const updatedHistory = [item, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("scanHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("scanHistory");
  };

  return (
    <ScanHistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </ScanHistoryContext.Provider>
  );
};

export const useScanHistory = () => {
  const context = useContext(ScanHistoryContext);
  if (context === undefined) {
    throw new Error("useScanHistory must be used within a ScanHistoryProvider");
  }
  return context;
};