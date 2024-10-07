"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

const CookieConsent = ({ hasConsent }: { hasConsent: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = async () => {
    // Send a request to the server to set the consent cookie
    const response = await fetch("/api/cookie-consent", {
      method: "POST",
      body: JSON.stringify({ consent: "accepted" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response Status:", response.status);

    setIsVisible(false);
  };

  const handleRefuse = async () => {
    // Send a request to the server to set the refusal cookie
    await fetch("/api/cookie-consent", {
      method: "POST",
      body: JSON.stringify({ consent: "refused" }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "background.paper",
          p: 3,
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          We use cookies to improve your experience. Do you accept?
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAccept}
            sx={{ mr: 2 }}
          >
            Accept
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleRefuse}>
            Refuse
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default CookieConsent;
