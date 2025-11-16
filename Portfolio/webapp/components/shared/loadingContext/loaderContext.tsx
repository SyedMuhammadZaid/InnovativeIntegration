"use client";
import { Spin } from "antd";
import { createContext, useContext, useState, ReactNode } from "react";

interface LoaderContextType {
    showLoader: () => void;
    hideLoader: () => void;
    loading: boolean;
}

const LoaderContext = createContext<LoaderContextType>({
    showLoader: () => { },
    hideLoader: () => { },
    loading: false,
});

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    return (
        <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
            {children}
            {loading && <Spin spinning={loading} fullscreen  />} {/* render loader globally */}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
