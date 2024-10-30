import React, { Suspense, lazy } from "react";
import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";

// Lazy load the ContactForm component
const ContactForm = lazy(() => import("@/components/ContactForm"));

export default function Contact() {
  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        my={10}
      >
        <Box sx={{ flex: "1 1 50%", p: 5 }}>
          <Image
            src="/Quantum.png"
            alt="quantum computing tangle"
            width={600}
            height={600}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Box>
        <Box
          sx={{
            flex: "1 1 50%",
            p: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Suspense fallback={<CircularProgress />}>
            <ContactForm />
          </Suspense>
        </Box>
      </Box>
    </>
  );
}
