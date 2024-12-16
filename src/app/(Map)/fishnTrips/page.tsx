"use client";

import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
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
  const router = useRouter();
  const handleCancel = () => {
    setTripInfo(null);
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
    router.refresh();
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

function TripMenu() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState([]);
  const email = session?.user?.email;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await axios.get("/api/itinerarydata", {
            params: { email },
          });
          console.log(response);
          if (response.status === 200) {
            setTrips(response.data.data);
          }
        }
      } catch (error) {
        console.log("Error fetching the data.");
      }
    };
    fetchData();
  }, [open, email]);

  const openNewTab = (tripId: string) => {
    const url = `fishnTrips/${tripId}`;
    window.open(url, "_blank"); // Open in a new tab
  };

  const handleEdit = (tripId: string) => {
    openNewTab(tripId);
  };

  const handleDelete = async (tripId: string) => {
    try {
      const response = await axios.delete("/api/itinerarydata", {
        params: { tripID: tripId },
      });
      if (response.status === 200) {
        setTrips((prevTrips) =>
          prevTrips.filter((trip: TripInfo) => trip.tripID !== tripId)
        );
      }
    } catch (error) {
      console.error("Error deleting the trip.");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenTripInput}
        sx={{ mb: 2 }}
      >
        Create Trip
      </Button>
      <TripInputBox open={open} onClose={handleCloseTripInput} />

      <Typography variant="h6" sx={{ mb: 2 }}>
        My Trips
      </Typography>
      <List>
        {trips.map((trip: TripInfo) => (
          <Box key={trip.tripID}>
            <ListItem>
              <ListItemText
                primary={trip.tripName}
                secondary={trip.description}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(trip.tripID)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(trip.tripID)}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </div>
  );
}

import SessionWrapper from "@/components/SessionWrapper";
export default function ReactDom() {
  return (
    <>
      <SessionWrapper>
        <TripMenu />
      </SessionWrapper>
    </>
  );
}
