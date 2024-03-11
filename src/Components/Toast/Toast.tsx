import React, {FC, useState, useEffect, useMemo} from "react";
import {Box, ButtonProps, Slide, Typography} from "@mui/material";
import CloseIcon from "../assets/CloseIcon";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import SuccessCheckLight from "../assets/SuccessCheckLight";
import SuccessCheckFilled from "../assets/SuccessCheckFilled";
import ErrorNotification from "../assets/ErrorNotification";
import ErrorMark from "../assets/ErrorMark";

interface ToastProps {
  type?: "error" | "success" | "info";
  variant?: "minimal" | "expanded";
  message?: string;
  ctaProps?: ButtonProps;
  avatarProps?: Omit<
    {
      title?: string;
      summary?: string | React.ReactNode;
      size?: number | string;
    },
    "summary"
  >;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
}

const Toast: FC<ToastProps> = ({
  type = "success",
  variant = "minimal",
  message,
  ctaProps,
  avatarProps = {},
  onClose,
  autoClose = true,
  autoCloseDuration,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      let timerId: any;
      if ((type === "success" || type === "error") && visible) {
        timerId = setTimeout(() => {
          onClose?.();
          setVisible(false);
        }, autoCloseDuration || 6000);
      }
      return () => timerId && clearTimeout(timerId);
    }
  }, [autoClose, autoCloseDuration, onClose, type, visible]);

  const isMinimal = useMemo(
    () => variant === "minimal" && !ctaProps?.onClick,
    [variant, ctaProps]
  );

  const isMessage = useMemo(() => avatarProps?.title, [avatarProps]);

  const messageText = useMemo(() => {
    if (message) return message;
    switch (type) {
      case "success":
        return "The action completed successfully.";
      case "error":
        return "Something went wrong.";
    }
  }, [type, message]);

  const color = useMemo(() => {
    const colorType = isMessage ? "message" : type;
    switch (colorType) {
      case "success":
        return {
          text: "success.light",
          ctaBtn: "success",
          border: "success.light",
        };
      case "error":
        return {
          text: "error.light",
          ctaBtn: "error",
          border: "error.light",
        };
      case "message":
        return {
          text: "grey.500",
          ctaBtn: "#FFFF00",
          border: "secondary.light",
        };
    }
  }, [type, isMessage]);

  const Icon = useMemo(() => {
    switch (type) {
      case "success":
        return isMinimal ? (
          <SuccessCheckLight sx={{color: "success.light", fontSize: "32px"}} />
        ) : (
          <Box display="flex" alignItems="center" mb="8px">
            <SuccessCheckFilled
              sx={{color: "success.light", fontSize: "18px"}}
            />
            <Typography
              fontSize="14px"
              color="success.light"
              ml="8px"
              fontWeight={600}
              data-testid="success-expand"
            >
              Success
            </Typography>
          </Box>
        );
      case "error":
        return isMinimal ? (
          <ErrorNotification sx={{color: "error.light", fontSize: "32px"}} />
        ) : (
          <Box display="flex" alignItems="center" mb="8px">
            <ErrorMark sx={{color: "error.light", fontSize: "18px"}} />
            <Typography
              className="error-msg"
              fontSize="14px"
              color="error.light"
              ml="8px"
              fontWeight={600}
              data-testid="error-expand"
            >
              Attention
            </Typography>
          </Box>
        );
    }
    return null;
  }, [type, isMinimal]);

  return (
    <Slide direction="right" in={visible}>
      <Box
        sx={{
          borderRadius: "6px",
          border: `1px solid`,
          borderColor: color?.border,
          p: "16px",
          display: "flex",
          alignItems: isMinimal ? "center" : "start",
          justifyContent: "space-between",
          maxWidth: "500px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMinimal ? "row" : "column",
            alignItems: isMinimal ? "center" : "start",
          }}
        >
          {isMessage ? (
            <ProfileImage
              {...avatarProps}
              summary={
                <Box display="flex" flexDirection="column">
                  <Typography fontSize="14px" color={color?.text}>
                    {messageText}
                  </Typography>
                  {ctaProps?.onClick && (
                    <Button
                      variant="contained"
                      {...ctaProps}
                      sx={{
                        mt: "10px",
                        maxWidth: "fit-content",
                        backgroundColor: color?.ctaBtn,
                        color: "common.black",
                        ...(ctaProps.sx || {}),
                      }}
                      title={ctaProps?.title || "Action"}
                    />
                  )}
                </Box>
              }
            />
          ) : (
            <>
              {" "}
              {Icon}
              <Box>
                <Typography
                  fontSize="14px"
                  color={color?.text}
                  ml={isMinimal ? "10px" : "0px"}
                >
                  {messageText}
                </Typography>
              </Box>
              {!isMinimal && ctaProps?.onClick && (
                <Button
                  variant="contained"
                  // @ts-ignore
                  color={color?.ctaBtn}
                  {...ctaProps}
                  sx={{mt: "10px", ...(ctaProps.sx || {})}}
                  title={ctaProps?.title || "Action"}
                />
              )}
            </>
          )}
        </Box>

        <CloseIcon
          data-testid="close-button"
          sx={{
            color: color?.text,
            fontSize: "18px",
            cursor: "pointer",
            ml: "10px",
          }}
          onClick={() => {
            onClose?.();
            setVisible(false);
          }}
        />
      </Box>
    </Slide>
  );
};

export default Toast;
