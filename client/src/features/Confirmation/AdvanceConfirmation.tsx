"use client";
import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useRef,
  ReactNode,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationConfig {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "warning" | "success";
  icon?: ReactNode;
  contentComponent?: React.ComponentType<{
    onDataChange: (data: string) => void;
  }>;
}

interface ConfirmationContextType {
  confirm: (
    config: ConfirmationConfig
  ) => Promise<{ confirmed: boolean; data: string | null }>;
}

interface ConfirmationProviderProps {
  children: ReactNode;
}

interface ConfirmationDialogProps extends ConfirmationConfig {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: string) => void;
}

const ConfirmationContext = createContext<ConfirmationContextType | null>(null);

export const useConfirmation = (): ConfirmationContextType => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirmation must be used within ConfirmationProvider");
  }
  return context;
};

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<{
    isOpen: boolean;
    config: ConfirmationConfig | null;
  }>({
    isOpen: false,
    config: null,
  });
  const resolveRef = useRef<
    ((result: { confirmed: boolean; data: string | null }) => void) | null
  >(null);

  const confirm = useCallback(
    (
      config: ConfirmationConfig = {}
    ): Promise<{ confirmed: boolean; data: string | null }> => {
      return new Promise((resolve) => {
        setState({
          isOpen: true,
          config: {
            title: config.title || "Confirmation",
            description:
              config.description || "Are you sure you want to continue?",
            confirmText: config.confirmText || "Confirm",
            cancelText: config.cancelText || "Cancel",
            variant: config.variant || "default",
            icon: config.icon,
            contentComponent: config.contentComponent,
          },
        });
        resolveRef.current = resolve;
      });
    },
    []
  );

  const handleClose = useCallback(
    (confirmed: boolean, data: string | null = null) => {
      setState((prev) => ({ ...prev, isOpen: false }));
      if (resolveRef.current) {
        resolveRef.current({ confirmed, data });
        resolveRef.current = null;
      }
    },
    []
  );

  const value = { confirm };

  return (
    <ConfirmationContext.Provider value={value}>
      {children}
      {state.isOpen && state.config && (
        <ConfirmationDialog
          isOpen={state.isOpen}
          onClose={() => handleClose(false)}
          onConfirm={(data) => handleClose(true, data)}
          {...state.config}
        />
      )}
    </ConfirmationContext.Provider>
  );
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  variant,
  icon,
  contentComponent: ContentComponent,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Define variant-specific classes for the confirm button.
  const getVariantClasses = () => {
    switch (variant) {
      case "danger":
        return {
          confirmButton:
            "px-4 py-2 bg-red-600 hover:bg-red-700 focus:ring-red-500",
        };
      case "warning":
        return {
          confirmButton:
            "px-4 py-2 bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
        };
      case "success":
        return {
          confirmButton:
            "px-4 py-2 bg-green-600 hover:bg-green-700 focus:ring-green-500",
        };
      default:
        return {
          confirmButton:
            "px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        };
    }
  };

  const variantClasses = getVariantClasses();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {icon && <span className="text-2xl">{icon}</span>}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
          {ContentComponent && (
            <ContentComponent onDataChange={(data) => setInputValue(data)} />
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 bg-gray-50 dark:bg-gray-700 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={() => onConfirm(inputValue)}
            className={cn(
              `${variantClasses.confirmButton} rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2`
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationProvider;

// Example Usage Component
// const ExampleComponent: React.FC = () => {
//   const { confirm } = useConfirmation();

//   const handleAction = async () => {
//     const result = await confirm({
//       title: 'Delete Account',
//       description: 'Are you sure you want to delete your account? This action cannot be undone.',
//       confirmText: 'Delete',
//       cancelText: 'Cancel',
//       variant: 'danger',
//       contentComponent: ({ onDataChange }) => (
//         <div className="mt-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Type "DELETE" to confirm
//           </label>
//           <input
//             type="text"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500"
//             onChange={(e) => onDataChange(e.target.value)}
//           />
//         </div>
//       ),
//     });

//     if (result.confirmed && result.data === 'DELETE') {
//       console.log('Account deleted!');
//     }
//   };

//   return (
//     <button
//       onClick={handleAction}
//       className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
//     >
//       Delete Account
//     </button>
//   );
// };
