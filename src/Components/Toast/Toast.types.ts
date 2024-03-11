import { ButtonProps } from "@mui/material";

export interface ToastProps {
    type: 'error' | 'success' | 'info';
    variant?: 'minimal' | 'expanded';
    message?: string;
    ctaProps?: ButtonProps;
    avatarProps?: any;
    onClose?:() => void;
    autoClose?: boolean;
    autoCloseDuration?: number
}   