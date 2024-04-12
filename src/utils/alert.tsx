import { createContext, useContext, useState, ReactNode } from "react";
import { AlertContext as AlertContextT, Alert as AlertT } from "./types";
import Alert from "@/components/Alert";

const AlertContext = createContext<AlertContextT>({
  alert: () => undefined,
  dismiss: () => undefined,
});

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertT[]>([]);

  const alert = (type: string, message: string) => {
    setAlerts([...alerts, { id: Date.now(), type, message }]);
  };

  const dismiss = (id: number) => {
    setAlerts((prevAlerts) => {
      return prevAlerts.filter((alert) => alert.id !== id);
    });
  };

  return (
    <AlertContext.Provider value={{ alert, dismiss }}>
      <div className="AlertProvider">
        {alerts.map((alert) => {
          return <Alert key={alert.id} alert={alert} />;
        })}
      </div>
      {children}
    </AlertContext.Provider>
  );
};
