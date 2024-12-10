"use client";

import { Box, Button, Modal, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TripInfo {
  tripID: string;
  tripName: string;
  description: string;
  email: string;
  data: any;
}

import axios from "axios";
async function TripCreation(tripInfo: TripInfo | null) {
  try {
    const response = await axios.post("/api/itinerarydata", tripInfo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data sent:", response.data);
  } catch (error) {
    console.error("There was an error submitting the form:", error);
  }
}

function TripInputBox({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tripInfo, setTripInfo] = useState<TripInfo | null>(null);
  const { data: session } = useSession();

  const handleCancel = () => {
    setTripInfo(null); // Reset the form (if needed)
    onClose();
  };

  const handleSave = () => {
    const uniqueTripID = Math.random().toString(36).substring(2, 10);

    // Include the tripID and email in tripInfo
    const updatedTripInfo: any = {
      ...tripInfo,
      tripID: uniqueTripID,
      email: session?.user?.email || "",
      data: { default: [] },
    };

    if (tripInfo?.tripName && tripInfo?.description) {
      TripCreation(updatedTripInfo);
      console.log("Trip created:", updatedTripInfo);
      handleCancel();
    } else {
      alert("Please enter the name and description.");
    }
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
        }}
      >
        <h2>Create a New Trip</h2>
        <form>
          <TextField
            fullWidth
            label="Trip Name"
            value={tripInfo?.tripName || ""}
            onChange={(e) =>
              setTripInfo((prev: any) => ({
                ...prev,
                tripName: e.target.value,
              }))
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={tripInfo?.description || ""}
            onChange={(e) =>
              setTripInfo((prev: any) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            margin="normal"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

function TripMenu() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/Auth");
    }
  }, [session, status, router]);

  const handleOpenTripInput = () => {
    setOpen(true);
  };

  const handleCloseTripInput = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenTripInput}>
        Create Trip
      </Button>
      <TripInputBox open={open} onClose={handleCloseTripInput} />
    </div>
  );
}

import SessionWrapper from "@/components/SessionWrapper";
import { prepareStackTrace } from "postcss/lib/css-syntax-error";
export default () => {
  return (
    <>
      <SessionWrapper>
        <TripMenu />
      </SessionWrapper>
    </>
  );
};
