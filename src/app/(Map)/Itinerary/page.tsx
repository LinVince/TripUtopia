"use client";
import {
  DndContext,
  useDroppable,
  DragOverlay,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

// Card interface for typing the card objects
interface Card {
  id: number;
  name?: string;
  longitude: number;
  latitude: number;
  placeID: string;
  address?: string;
}

interface UserCardsData {
  [columnName: string]: Card[];
}
// Cards data shared with users (GET API with User's Email)
let sharedCardsData: Card[] = [];

const scrollBarStyle = {
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
    // Set the width of the scrollbar
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#aaa", // Scrollbar thumb color
    borderRadius: "10px", // Rounded scrollbar thumb
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1", // Scrollbar track color
    borderRadius: "10px",
  },
};

// Make cards sortable
import { CSS } from "@dnd-kit/utilities";
import { Paper, Divider } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function SortableCard(card: Card) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const sortableStyle = {
    marginBottom: 20,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const mapContext = useMapContext();

  const handleCardClick = () => {
    const { setLocationData } = mapContext;
    setLocationData({
      latitude: card.latitude,
      longitude: card.longitude,
      placeID: card.placeID,
    });
  };

  const handleDeleteClick = () => {
    const { setUserItineraryData } = mapContext;
    setUserItineraryData((preState: UserCardsData) => {
      const updatedState = Object.fromEntries(
        Object.entries(preState).map(([day, cards]) => [
          day,
          cards.filter((c) => c.id !== card.id), // Remove the card with the matching id
        ])
      );
      return updatedState;
    });
  };

  return (
    <div ref={setNodeRef} style={sortableStyle} {...attributes}>
      <Paper
        sx={(theme) => ({
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: "#fff",
          ...theme.applyStyles("dark", {
            backgroundColor: "#1A2027",
          }),
        })}
      >
        <Typography gutterBottom variant="subtitle1" component="div">
          {card.name}
        </Typography>
        <Typography variant="body2" color="#a5a5a5">
          {card.address}
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <IconButton onClick={handleDeleteClick}>
              <DeleteOutlineOutlinedIcon style={{ color: "#a5a5a5" }} />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={handleCardClick}>
              <RoomOutlinedIcon />
            </IconButton>
            <IconButton {...listeners}>
              <DragIndicatorIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}

// Droppable Column component using useDroppable
interface DroppableColumnProps {
  id: string;
  cards: Card[];
}

import { Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

const EditableColumnName = ({ columnName }: { columnName: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(columnName);
  const mapContext = useMapContext();
  const { userItineraryData, setUserItineraryData } = mapContext;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (
      Object.keys(userItineraryData).includes(tempName) &&
      tempName !== columnName
    ) {
      alert("The name is already taken. ");

      return;
    }

    setIsEditing(false);

    if (columnName !== tempName) {
      // Create a new object
      const newObj = Object.entries(userItineraryData).reduce(
        (acc, [key, value]) => {
          acc[key === columnName ? tempName : key] = value;
          return acc;
        },
        {} as UserCardsData
      );

      // Update global state
      setUserItineraryData(newObj);
    }
  };

  const columnNameStyle = {
    fontSize: "20px",
    fontWeight: "600",
    fontFamily: "inter, sans-serif",
    textAlign: "center",
    color: "#555",
    lineHeight: "2",
    py: 1,
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ py: 1 }}
    >
      {isEditing ? (
        <>
          <Input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            autoFocus
            sx={{
              ...columnNameStyle,
            }}
          />
          <IconButton onClick={handleSaveClick} size="small">
            <CheckIcon fontSize="small" />
          </IconButton>
        </>
      ) : (
        <>
          <Typography
            sx={{
              ...columnNameStyle,
            }}
          >
            {columnName}
          </Typography>

          <IconButton onClick={handleEditClick} size="small">
            <EditIcon
              sx={{ color: "rgba(0,0,0,0.2 )", paddingLeft: "10px" }}
              fontSize="small"
            />
          </IconButton>
        </>
      )}
    </Box>
  );
};

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
function DroppableColumn({ id, cards }: DroppableColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  const mapContext = useMapContext();
  const { userItineraryData, setUserItineraryData } = mapContext;

  const style = {
    minWidth: "200px",
    maxWidth: "350px",
    height: "85vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 5,
    px: 2,
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: "10px",
    mx: 1,
    flex: 1,
    overflowX: "auto",
    overflowY: "auto",
    ...scrollBarStyle,
  };

  const handleColumnDeletion = () => {
    const newObj = Object.fromEntries(
      Object.entries(userItineraryData).filter(([key, value]) => key !== id)
    );
    setUserItineraryData(newObj);
  };

  return (
    <SortableContext
      id={id}
      items={cards.map((card) => card.id)}
      strategy={verticalListSortingStrategy}
    >
      <Box ref={setNodeRef} sx={style}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <EditableColumnName columnName={id} />
          <IconButton onClick={handleColumnDeletion}>
            <DeleteOutlinedIcon style={{ color: "#cccccc" }} />
          </IconButton>
        </Box>
        <Box sx={{ ...style, overflow: "auto" }}>
          {cards.length > 0 ? (
            cards.map((card) => <SortableCard key={card.id} {...card} />)
          ) : (
            <p>Add or drag a site here</p>
          )}
        </Box>
      </Box>
    </SortableContext>
  );
}

import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import axios from "axios";

function DragAndDropPage() {
  const mapContext = useMapContext();
  const {
    userItineraryData,
    setUserItineraryData,
    itineraryWindowExpanded,
    setItineraryWindowExpanded,
  } = mapContext;
  const [activeId, setActiveId] = useState<number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const wrapperStyle = {
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    px: 0,
    overflow: "auto",
    position: "relative",
    ...scrollBarStyle,
  };

  function findContainer(id: number | string) {
    if (typeof id === "number") {
      return Object.keys(userItineraryData).find((key) =>
        userItineraryData[key as keyof typeof userItineraryData].some(
          (card) => card.id === id
        )
      );
    } else {
      return id; // If it's a column ID, return it directly
    }
  }

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragOver(event: any) {
    const { active, over } = event;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setUserItineraryData((prev: any) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeCard = activeItems.find(
        (card: Card) => card.id === active.id
      );

      if (!activeCard) return prev;

      return {
        ...prev,
        [activeContainer]: activeItems.filter(
          (card: Card) => card.id !== active.id
        ),
        [overContainer]: [...overItems, activeCard],
      };
    });
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over?.id ?? "");

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      return;
    }

    if (activeContainer === overContainer) {
      const activeIndex = userItineraryData[activeContainer].findIndex(
        (card) => card.id === active.id
      );
      const overIndex = userItineraryData[overContainer].findIndex(
        (card) => card.id === over.id
      );

      if (activeIndex !== overIndex) {
        setUserItineraryData((prev: any) => ({
          ...prev,
          [overContainer]: arrayMove(
            prev[overContainer],
            activeIndex,
            overIndex
          ),
        }));
      }
    } else {
      setUserItineraryData((prev: any) => {
        const activeItems = prev[activeContainer];
        const overItems = prev[overContainer];
        const activeCard = activeItems.find(
          (card: Card) => card.id === active.id
        );

        if (!activeCard) return prev;

        return {
          ...prev,
          [activeContainer]: activeItems.filter(
            (card: Card) => card.id !== active.id
          ),
          [overContainer]: [...overItems, activeCard],
        };
      });
    }

    setActiveId(null);
  }

  const handleExpandedClick = () => {
    setItineraryWindowExpanded(!itineraryWindowExpanded);
  };

  function addNewDay(day: string) {
    if (!Object.keys(userItineraryData).includes(day)) {
      setUserItineraryData((prevState: any) => ({ ...prevState, [day]: [] }));
    } else {
      alert(`Please rename the latest column before creating a new one.`);
    }
  }

  const handleAddColumnClick = () => {
    addNewDay("To_Be_Renamed");
  };

  const { data: session } = useSession();

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/itinerarydata", {
        data: userItineraryData,
        email: session?.user?.email,
      });
      console.log("Data sent:", response.data);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <Box sx={wrapperStyle}>
      <DndContext
        sensors={sensors}
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          {Object.entries(userItineraryData).map(([columnName, cards]) => (
            <DroppableColumn key={columnName} id={columnName} cards={cards} />
          ))}
        </Box>

        <DragOverlay>
          {activeId ? (
            <SortableCard
              {...userItineraryData[findContainer(activeId)!].find(
                (card) => card.id === activeId
              )!}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <Box
        sx={{
          position: "sticky",
          right: 0,
          display: "flex",
          flexDirection: "column",
          px: 2,
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <IconButton onClick={handleExpandedClick}>
          {itineraryWindowExpanded ? (
            <FullscreenExitOutlinedIcon />
          ) : (
            <FullscreenOutlinedIcon />
          )}
        </IconButton>
        <IconButton
          onClick={handleAddColumnClick}
          sx={{
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <AddOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={handleSave}
          sx={{
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <SaveAltOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "./styles.css";
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;
const GOOGLE_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;
const INITIAL_VIEW_STATE = {
  latitude: 25.02434493613632,
  longitude: 121.53592051950127,
  zoom: 16,
  pitch: 1,
  bearing: 0,
  transitionDuration: 1000,
};

function GoogleMap() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const mapContext = useMapContext();
  const { locationData, setLocationData } = mapContext;
  const mapRef = useRef<any>(null);
  const googleMapInstance = useRef<any>(null);

  const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY || "",
    libraries: ["places", "maps"],
    version: "weekly",
  });

  useEffect(() => {
    if (locationData) {
      setViewState((preState) => ({
        ...viewState,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      }));
    } else {
      setViewState(INITIAL_VIEW_STATE);
    }
  }, [locationData]);

  useEffect(() => {
    const loadMap = async () => {
      try {
        // Load the maps library
        const { Map } = await loader.importLibrary("maps");
        const { Autocomplete } = await loader.importLibrary("places");

        const mapOptions = {
          center: { lat: viewState.latitude, lng: viewState.longitude },
          zoom: viewState.zoom,
          mapId: GOOGLE_MAP_ID,
          mapTypeControl: false,
          streetViewControl: false,
          tilt: 45,
        };

        googleMapInstance.current = new Map(mapRef.current, mapOptions);

        const autocompleteInput = document.createElement("input");
        autocompleteInput.type = "text";
        autocompleteInput.style.fontSize = "16px";
        autocompleteInput.placeholder = "Search location...";
        autocompleteInput.style.width = "400px";
        autocompleteInput.style.height = "60px";
        autocompleteInput.style.margin = "10px auto";
        autocompleteInput.style.padding = "0px 20px";
        autocompleteInput.style.border = "0px solid #ccc";
        autocompleteInput.style.borderRadius = "30px";
        autocompleteInput.style.position = "absolute";
        autocompleteInput.style.top = "10px";
        autocompleteInput.style.left = "50%";
        autocompleteInput.style.transform = "translateX(-50%)";
        autocompleteInput.style.zIndex = "0";
        autocompleteInput.addEventListener("focus", () => {
          autocompleteInput.style.outline = "none";
          autocompleteInput.style.border = "0px";
        });

        mapRef.current?.appendChild(autocompleteInput);

        const autocomplete = new Autocomplete(autocompleteInput, {
          fields: ["geometry", "place_id", "formatted_address", "name"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place?.geometry?.location) {
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            const placeID = place?.place_id || "";

            setLocationData({ latitude, longitude, placeID });
            googleMapInstance.current.panTo({ lat: latitude, lng: longitude });
            setViewState((prevState) => ({
              ...prevState,
              latitude,
              longitude,
            }));
          }
        });

        // Add the click listener here after initializing the map
        googleMapInstance.current.addListener("click", async (event: any) => {
          const latitude = event.latLng.lat();
          const longitude = event.latLng.lng();
          const placeID = event.placeId;

          setLocationData({ latitude, longitude, placeID });
          googleMapInstance.current.panTo({ lat: latitude, lng: longitude });
          /*if (placeID) {
            try {
              const { PlacesService } = await loader.importLibrary("places");
              const placesService = new PlacesService(
                googleMapInstance.current
              );
              
            } catch (error) {
              console.error(
                "Error loading PlacesService or fetching details",
                error
              );
            }
          }*/
        });
      } catch (error) {
        console.error("Error loading Google Maps", error);
      }
    };
    loadMap();
  }, []);

  useEffect(() => {
    if (googleMapInstance.current) {
      googleMapInstance.current.panTo({
        lat: viewState?.latitude,
        lng: viewState?.longitude,
      });
    }
  }, [viewState]);

  /*const fetchPlaceDetails = (placesService: any, placeID: string) => {
    if (placeID) {
      const request = {
        placeId: placeID,
        fields: ["name", "formatted_address"],
      };
      placesService.getDetails(request, (place: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(place);
        } else {
          console.error("Error fetching place details", status);
        }
      });
    }
  };*/

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100vh", position: "relative" }}
    />
  );
}

import dynamic from "next/dynamic";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
interface Place {
  formatted_address: string;
  formatted_phone_number: string;
  name: string;
  rating: number;
  types: string[];
  website: string;
  html_attributions: string[];
  photos: google.maps.places.PlacePhoto[];
  reviews: google.maps.places.PlaceReview[];
  user_ratings_total: number;
  url: string;
}

function PlaceDetail() {
  const PlaceOverview = dynamic(
    () =>
      import("@googlemaps/extended-component-library/react").then(
        (mod) => mod.PlaceOverview
      ),
    { ssr: false }
  );
  const APILoader = dynamic(
    () =>
      import("@googlemaps/extended-component-library/react").then(
        (mod) => mod.APILoader
      ),
    { ssr: false }
  );
  const PlaceDirectionsButton = dynamic(
    () =>
      import("@googlemaps/extended-component-library/react").then(
        (mod) => mod.PlaceDirectionsButton
      ),
    { ssr: false }
  );

  const mapContext = useMapContext();
  const {
    locationData,
    setLocationData,
    userItineraryData,
    setUserItineraryData,
    mapDetailOpen,
    setMapDetailOpen,
  } = mapContext;

  const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY || "",
    libraries: ["places", "maps"],
    version: "weekly",
  });

  const dummyDiv = document.createElement("div");

  const [placeData, setPlaceData] = useState<Place | null>();

  const [OpenColumnList, setOpenColumnList] = useState("none");
  const HandleOpenColumnList = () => {
    if (OpenColumnList === "none") {
      setOpenColumnList("block");
    } else {
      setOpenColumnList("none");
    }
  };

  useEffect(() => {
    const fetchPlaceData = async () => {
      if (locationData) {
        const { PlacesService } = await loader.importLibrary("places");
        const request = {
          placeId: locationData.placeID,
          fields: [
            "name",
            "rating",
            "type",
            "formatted_address",
            "website",
            "formatted_phone_number",
            "photos",
            "reviews",
            "user_ratings_total",
            "url",
          ],
        };
        const placesService = new PlacesService(dummyDiv);

        // Call placesService.getDetails or other relevant methods here
        placesService.getDetails(request, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place) {
              console.log(place);
              const validatedPlaceData: Place = {
                formatted_address: place.formatted_address ?? "",
                formatted_phone_number: place.formatted_phone_number ?? "",
                name: place.name ?? "",
                rating: place.rating ?? 0,
                types: place.types ?? [],
                website: place.website ?? "",
                html_attributions: place.html_attributions ?? [],
                photos: place.photos ?? [],
                reviews: place.reviews ?? [],
                user_ratings_total: place.user_ratings_total ?? 0,
                url: place.url ?? "",
              };
              setPlaceData(validatedPlaceData);
            }
          } else {
            // Handle any error or failure to retrieve data
            console.error("Failed to load place details");
          }
        });
      }
    };

    fetchPlaceData();
  }, [locationData]);

  const handleClose = () => {
    setMapDetailOpen(false);
  };

  useEffect(() => {
    if (locationData) setMapDetailOpen(true);
  }, [locationData]);

  const UpdateItinerary = async (column: string) => {
    if (locationData) {
      const { PlacesService } = await loader.importLibrary("places");
      const request = {
        placeId: locationData.placeID,
        fields: ["name", "formatted_address"],
      };
      const placesService = new PlacesService(dummyDiv);

      placesService.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const totalItems = Object.values(userItineraryData).reduce(
            (acc, columnList) => acc + columnList.length,
            0
          );

          const newCard: Card = {
            id: totalItems + 1,
            name: place?.name,
            placeID: locationData.placeID,
            address: place?.formatted_address,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
          };

          setUserItineraryData((preState: any) => ({
            ...preState,
            [column]: [...preState[column], newCard],
          }));

          setOpenColumnList("none");
        }
      });
    } else {
      console.log("Cannot connect.");
    }
  };
  return (
    <div className="container">
      <APILoader
        apiKey={GOOGLE_MAPS_API_KEY}
        solutionChannel="GMP_GCC_placeoverview_v1_xl"
      />

      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          borderRadius: "0px 10px 0px 0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          sx={{
            p: 3,
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          onClick={HandleOpenColumnList}
        >
          <AddLocationOutlinedIcon color="primary" />
        </IconButton>
        <Box
          sx={{
            display: OpenColumnList,
            position: "absolute",
            zIndex: 1035,
            left: 10,
            top: 50,
            backgroundColor: "#fcfcfc",
            minWidth: "100%",
            borderRadius: "10px",
            boxShadow: "20px solid black",
            height: "auto",
            p: 1,
          }}
        >
          <Typography
            sx={{
              p: 2,
              textAlign: "center",
              fontWeight: 500,
              fontSize: "1.1rem",
            }}
          >
            Add to one of the columns
          </Typography>
          <List>
            {Object.keys(userItineraryData).map((k, i) => {
              return (
                <>
                  <Divider />
                  <ListItem
                    style={{ padding: 20, cursor: "pointer" }}
                    onClick={() => UpdateItinerary(k)}
                  >
                    {k}
                  </ListItem>
                </>
              );
            })}
          </List>
        </Box>
        <IconButton
          sx={{
            p: 3,
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: "auto",
          borderRadius: "0px 5px 0px 0px",
          padding: 2,
          ...scrollBarStyle,
        }}
      >
        {/* Scrollable Gallery */}
        {placeData && placeData?.photos?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 1,
              pb: 2,
              "&::-webkit-scrollbar": {
                height: 6,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
                borderRadius: 3,
              },
            }}
          >
            {placeData.photos.map((photo, index) => (
              <Box
                key={index}
                component="img"
                src={photo.getUrl({ maxWidth: 300 })}
                alt={`Place photo ${index + 1}`}
                sx={{
                  height: "150px",
                  minWidth: "200px",
                  borderRadius: "5px",
                  objectFit: "cover",
                }}
              />
            ))}
          </Box>
        )}

        {placeData?.name && (
          <Typography
            sx={{ mt: 2 }}
            variant="h5"
            fontWeight="bold"
            gutterBottom
          >
            {placeData.name}
          </Typography>
        )}

        {placeData?.rating && (
          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={placeData.rating} readOnly precision={0.1} />
            <Typography variant="body2" color="textSecondary" ml={1}>
              {placeData.rating.toFixed(1)} ({placeData.user_ratings_total})
            </Typography>
          </Box>
        )}

        {placeData?.types && (
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            {placeData.types[0]
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Typography>
        )}

        {placeData?.formatted_address && (
          <Typography variant="body2" color="textPrimary" paragraph>
            {placeData.formatted_address}
          </Typography>
        )}

        {placeData?.formatted_phone_number && (
          <Typography variant="body2" color="textPrimary" paragraph>
            {placeData.formatted_phone_number}
          </Typography>
        )}
        <Divider />
        {placeData?.reviews && placeData.reviews.length > 0 && (
          <Box mt={3}>
            <Chip label="Most Recent" sx={{ mb: 3 }} />

            {placeData.reviews
              .sort((a, b) => b.time - a.time) // Sort by most recent
              .map((review, index) => (
                <Box
                  key={index}
                  sx={{
                    borderBottom: "1px solid #ddd",
                    paddingBottom: 2,
                    marginBottom: 2,
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    mb={1}
                  >
                    <Typography variant="subtitle2" fontWeight="bold">
                      {review.author_name}
                    </Typography>
                    <Rating
                      value={review.rating}
                      readOnly
                      size="small"
                      sx={{ ml: 0 }}
                    />
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ ml: 0 }}
                    >
                      {format(new Date(review.time * 1000), "PPPp")}{" "}
                      {/* Format timestamp */}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {review.text}
                  </Typography>
                </Box>
              ))}
          </Box>
        )}
        {placeData?.reviews && (
          <Link
            href={placeData.url}
            target="_blank"
            sx={{ textDecoration: "none" }}
          >
            <Typography>More on Google Maps</Typography>
          </Link>
        )}
        {/*<PlaceOverview place={locationData?.placeID}>
          <PlaceDirectionsButton slot="action">
            Directions
          </PlaceDirectionsButton>
        </PlaceOverview>*/}
      </Box>
    </div>
  );
}

import { useContext, createContext } from "react";

interface MapContextType {
  locationData: { latitude: number; longitude: number; placeID: string } | null;
  setLocationData: (
    data: { latitude: number; longitude: number; placeID: string } | null
  ) => void;
  userItineraryData: UserCardsData;
  setUserItineraryData: (data: any) => void;
  mapDetailOpen: boolean;
  setMapDetailOpen: (data: boolean) => void;
  itineraryWindowExpanded: boolean;
  setItineraryWindowExpanded: (data: boolean) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locationData, setLocationData] = useState<{
    latitude: number;
    longitude: number;
    placeID: string;
  } | null>(null);

  const [userItineraryData, setUserItineraryData] = useState<UserCardsData>({});

  const { data: session } = useSession();
  const email = session?.user?.email;

  //use hook to fetch UserCardData
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await axios.get("/api/itinerarydata", {
            params: { email },
          });
          if (response.status === 200) {
            setUserItineraryData(response.data.data.data);
          } else if (response.status === 201) {
            setUserItineraryData({ default: [] });
          }
        }
      } catch (error) {
        console.log("Error fetching the data");
      }
    };
    fetchData();
  }, [email]);

  const [mapDetailOpen, setMapDetailOpen] = useState(false);
  const [itineraryWindowExpanded, setItineraryWindowExpanded] = useState(false);

  return (
    <MapContext.Provider
      value={{
        locationData,
        setLocationData,
        userItineraryData,
        setUserItineraryData,
        mapDetailOpen,
        setMapDetailOpen,
        itineraryWindowExpanded,
        setItineraryWindowExpanded,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function ItineraryPage() {
  const mapContext = useMapContext();
  const { locationData, mapDetailOpen, itineraryWindowExpanded } = mapContext;
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/Auth");
    }

    console.log(session);
  }, [session, status, router]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: itineraryWindowExpanded ? "100%" : "40%",
            backgroundColor: "black",
          }}
        >
          <DragAndDropPage />
        </Box>

        <Box
          sx={{
            width: itineraryWindowExpanded ? "0%" : "60%",
            height: "100vh",
            position: "relative",
          }}
        >
          <GoogleMap />
          {locationData?.placeID && (
            <Box
              sx={{
                width: "30%",
                display: mapDetailOpen ? "inherit" : "none",
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100vh",
                  backgroundColor: "white",
                  overflow: "auto",
                  ...scrollBarStyle,
                }}
              >
                <PlaceDetail />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

import SessionWrapper from "@/components/SessionWrapper";
import { User } from "next-auth";
import { userInfo } from "os";
import { SafetyDivider } from "@mui/icons-material";
export default function RenderDom() {
  return (
    <SessionWrapper>
      <MapProvider>
        <ItineraryPage />
      </MapProvider>
    </SessionWrapper>
  );
}
