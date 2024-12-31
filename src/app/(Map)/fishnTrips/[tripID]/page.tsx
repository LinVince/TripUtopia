"use client";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
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
  Paper,
  Divider,
  Box,
  Tooltip,
  Chip,
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
  Input,
  Modal,
  Popover,
} from "@mui/material";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Loader } from "@googlemaps/js-api-loader";
import { CSS } from "@dnd-kit/utilities";
import {
  DragIndicator as DragIndicatorIcon,
  RoomOutlined as RoomOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  DeleteOutlined as DeleteOutlinedIcon,
  FullscreenOutlined as FullscreenOutlinedIcon,
  FullscreenExitOutlined as FullscreenExitOutlinedIcon,
  AddOutlined as AddOutlinedIcon,
  SaveAltOutlined as SaveAltOutlinedIcon,
  AddLocationOutlined as AddLocationOutlinedIcon,
  Close as CloseIcon,
  MoreHorizOutlined as MoreHorizOutlinedIcon,
} from "@mui/icons-material";
import axios from "axios";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import Image from "next/image";
// Fetch the ID and secret in local env
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;
const GOOGLE_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

// Load the Google Map API library
const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY || "",
  libraries: ["maps", "places", "routes"],
  version: "weekly",
});

// Card interface for typing the card objects
interface Card {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  placeID: string;
  address: string;
  img: any;
}

// Data used to initialize MapContext
interface UserCardsData {
  [columnName: string]: Card[];
}

// Styles applied to all scrollbars
const scrollBarStyle = {
  "&::-webkit-scrollbar": {
    width: "5px",
    height: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#aaa",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
    borderRadius: "10px",
  },
};

// Sortable card component with tourist attrach data
function SortableCard(card: Card) {
  // Fetch states, animation, events from useSortable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  // Set the popover handle for function buttons
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Import setLocationData from mapContext
  const mapContext = useMapContext();
  const { setLocationData, setUserItineraryData } = mapContext;

  // Set the style of the card
  const sortableStyle = {
    marginBottom: 20,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Set the style of the name
  const nameStyle = {
    fontWeight: 600,
    fontFamily: "inter, sans-serif",
    px: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "140px",
  };

  // Click the map icon on the card to pin the tourist attraction on the map
  const handleCardClick = () => {
    setLocationData({
      name: card.name,
      address: card.address,
      latitude: card.latitude,
      longitude: card.longitude,
      placeID: card.placeID,
    });
  };

  // Click the icon to delete the card
  const handleDeleteClick = () => {
    setUserItineraryData((preState: UserCardsData) => {
      //Convert an array to an object
      const updatedState = Object.fromEntries(
        // Remove the card with the matching id (output type: list)
        Object.entries(preState).map(([day, cards]) => [
          day,
          cards.filter((c) => c.id !== card.id),
        ])
      );
      return updatedState;
    });
  };

  // Handle popover close/open
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {/* SortableCard component */}
      <Box ref={setNodeRef} style={sortableStyle} {...attributes}>
        {/* Style of the card */}
        <Paper
          sx={(theme) => ({
            p: 2,
            margin: "auto",
            minWidth: "250px",
            flexGrow: 1,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "row",
          })}
        >
          {/* Layout of the card information */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              minWidth: "150px",
            }}
          >
            <Box
              component="img"
              src={card.img?.getUrl ? card.img.getUrl({ maxWidth: 250 }) : ""}
              sx={{
                height: "30px",
                width: "30px",
                borderRadius: "5px",
                objectFit: "cover",
              }}
            />
            <Tooltip
              title={
                <Typography sx={{ fontSize: "1.2rem" }}>{card.name}</Typography>
              }
              arrow
            >
              <Typography sx={nameStyle}>{card.name}</Typography>
            </Tooltip>
          </Box>

          {/* Layout of the functional icons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <IconButton onClick={handleOpenPopover}>
                <MoreHorizOutlinedIcon style={{ color: "#a5a5a5" }} />
              </IconButton>

              {/* Delete the card */}
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "left",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  {/* Pin the card location on the map */}
                  <IconButton onClick={handleCardClick}>
                    <RoomOutlinedIcon />
                  </IconButton>
                  {/* Delete the card*/}
                  <IconButton onClick={handleDeleteClick}>
                    <DeleteOutlineOutlinedIcon style={{ color: "#a5a5a5" }} />
                  </IconButton>
                </Box>
              </Popover>

              {/* Drag the card */}
              <IconButton {...listeners}>
                <DragIndicatorIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

// The editable name component on the DropableColumn
const EditableColumnName = ({ columnName }: { columnName: string }) => {
  // State of the editable name component
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(columnName);

  // Import itineraryData from mapContext
  const mapContext = useMapContext();
  const { userItineraryData, setUserItineraryData } = mapContext;

  // Style of the component
  const columnNameStyle = {
    fontSize: "20px",
    fontWeight: "600",
    fontFamily: "inter, sans-serif",
    textAlign: "center",
    color: "#555",
    lineHeight: "2",
    py: 1,
  };

  const iconStyle = {
    color: "rgba(0,0,0,0.2 )",
    paddingLeft: "10px",
    fontSize: "small",
  };

  // Click to edit the name
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Click to exit edition and save the name
  const handleSaveClick = () => {
    if (
      // Avoid duplicate the same name
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
        // reduce() builds a new object by processing each key-value pair.
        (acc, [key, value]) => {
          acc[key === columnName ? tempName : key] = value;
          // Return acc in Each Iteration
          return acc;
        },
        // initialize the acc object as {}
        {} as UserCardsData
      );

      // Update global state
      setUserItineraryData(newObj);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ py: 1 }}
    >
      {/*Edit Mode / Presentation Mode*/}
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
          <IconButton onClick={handleSaveClick}>
            <CheckIcon sx={{ ...iconStyle }} />
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

          <IconButton onClick={handleEditClick}>
            <EditIcon
              sx={{
                ...iconStyle,
              }}
            />
          </IconButton>
        </>
      )}
    </Box>
  );
};

// Google Map Routes library to get transport information
function GetDirection({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) {
  // State of the components
  const [distance, setDistance] = useState<string>();
  const [duration, setDuration] = useState<string>();
  const [travelMode, setTravelMode] = useState<string>();

  // Get routes information between two cards
  useEffect(() => {
    const fetchData = async () => {
      const { DirectionsService, TravelMode } = await loader.importLibrary(
        "routes"
      );
      const directionInfo = new DirectionsService();

      const request = {
        origin: origin,
        destination: destination,
        travelMode: TravelMode.DRIVING,
      };

      directionInfo.route(request, (response) => {
        if (
          response?.routes?.length &&
          response.routes[0]?.legs?.length &&
          response.routes[0].legs[0]?.distance?.text &&
          response.routes[0].legs[0]?.duration?.text &&
          response.request.travelMode
        ) {
          setDistance(response.routes[0].legs[0].distance.text);
          setDuration(response.routes[0].legs[0].duration.text);
          if (response.request.travelMode) {
            setTravelMode(response.request.travelMode.toLowerCase());
          }
        } else {
          console.warn("Invalid response structure", response);
        }
      });
    };

    fetchData();
  }, [origin, destination]);

  return (
    <Box>
      {duration}, {distance} by {travelMode}
    </Box>
  );
}

// Droppable Column component using useDroppable
interface DroppableColumnProps {
  id: string;
  cards: Card[];
}

// Droppable column that accomodates cards
function DroppableColumn({ id, cards }: DroppableColumnProps) {
  // Import useDroppable states
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  // Import itineraryData from mapContext
  const mapContext = useMapContext();
  const { userItineraryData, setUserItineraryData } = mapContext;

  // Apply the style of the column
  const columnStyle = {
    minWidth: "300px",
    maxWidth: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: "10px",
    overflowX: "auto",
    overflowY: "auto",
    ...scrollBarStyle,
  };

  // Delete the column
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
      <Box ref={setNodeRef} sx={columnStyle}>
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
        <Box sx={{ ...columnStyle, overflow: "auto" }}>
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <>
                <SortableCard key={card.id} {...card} />
                {/* Add GetDirection only if there is a next card */}
                {index < cards.length - 1 && (
                  <GetDirection
                    origin={cards[index].address || ""}
                    destination={cards[index + 1].address || ""}
                  />
                )}
              </>
            ))
          ) : (
            <p>Add or drag a site here</p>
          )}
        </Box>
      </Box>
    </SortableContext>
  );
}

// Page with draggable cards and droppable columns
function DragAndDropPage() {
  // Import the states
  const [activeId, setActiveId] = useState<number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Import trip(page)ID and itineraryData from mapContext
  const mapContext = useMapContext();
  const {
    tripID,
    userItineraryData,
    setUserItineraryData,
    itineraryWindowExpanded,
    setItineraryWindowExpanded,
  } = mapContext;

  // Style of the component
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

  const sideFunctionBarStyle = {
    position: "sticky",
    right: 0,
    display: "flex",
    flexDirection: "column",
    px: 2,
    justifyContent: "space-between",
    backgroundColor: "white",
  };

  // Check the column where the column belongs to
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

  // Stores the id of the active (dragged) card in the state variable activeId.
  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(active.id);
  }

  //If the card is moved between different containers. Remove the activeCard from the activeContainer. Add the activeCard to the overContainer.
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

    // If the card is dropped within the same container. Identify the activeIndex (original position) and overIndex (new position). Use arrayMove to rearrange the card within the container.
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
    }
    // If the card is dropped in a different container: Remove the card from the activeContainer. Add the card to the overContainer.
    else {
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

  // Expand the component to fullscreen
  const handleExpandedClick = () => {
    setItineraryWindowExpanded(!itineraryWindowExpanded);
  };

  // Add a new column
  function addColumn() {
    if (!Object.keys(userItineraryData).includes("New Column")) {
      setUserItineraryData((prevState: any) => ({
        ...prevState,
        ["New Column"]: [],
      }));
    } else {
      alert(`Please rename the latest column before creating a new one.`);
    }
  }

  // Extract email valuefrom session
  // Save the itineraryData to the database
  const { data: session } = useSession();
  const handleSave = async () => {
    try {
      const response = await axios.post("/api/itinerarydata", {
        data: userItineraryData,
        email: session?.user?.email,
        tripID: tripID,
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

      {/*Functions: Full screen, add column, save*/}
      <Box sx={sideFunctionBarStyle}>
        <IconButton onClick={handleExpandedClick}>
          {itineraryWindowExpanded ? (
            <FullscreenExitOutlinedIcon />
          ) : (
            <FullscreenOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={addColumn}>
          <AddOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleSave}>
          <SaveAltOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

function GoogleMap() {
  // Initial viewState of the map
  const INITIAL_VIEW_STATE = {
    latitude: 25.02434493613632,
    longitude: 121.53592051950127,
    zoom: 16,
    pitch: 1,
    bearing: 0,
    transitionDuration: 1000,
  };
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  // Import location state from mapContext
  const mapContext = useMapContext();
  const { locationData, setLocationData } = mapContext;

  // Set HTML elements
  const mapRef = useRef<any>(null);
  const googleMapInstance = useRef<any>(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        // Load the maps library
        const { Map } = await loader.importLibrary("maps");
        const { Autocomplete, PlacesService } = await loader.importLibrary(
          "places"
        );

        const mapOptions = {
          center: { lat: viewState.latitude, lng: viewState.longitude },
          zoom: viewState.zoom,
          mapId: GOOGLE_MAP_ID,
          mapTypeControl: false,
          streetViewControl: false,
          tilt: 45,
        };

        // Refer to the map and set the style of the input
        googleMapInstance.current = new Map(mapRef.current, mapOptions);

        // Search the tourist attraction on the search bar
        const autocompleteInput = document.createElement("input");
        autocompleteInput.className = "autocomplete-input";
        autocompleteInput.type = "text";
        autocompleteInput.placeholder = "Search location...";
        mapRef.current?.appendChild(autocompleteInput);

        const autocomplete = new Autocomplete(autocompleteInput, {
          fields: ["geometry", "place_id", "formatted_address", "name"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place?.geometry?.location) {
            const name = place.name ?? "";
            const address = place.formatted_address ?? "";
            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            const placeID = place?.place_id ?? "";

            setLocationData({ name, address, latitude, longitude, placeID });
            googleMapInstance.current.panTo({ lat: latitude, lng: longitude });
            setViewState((prevState) => ({
              ...prevState,
              latitude,
              longitude,
            }));
          }
        });

        // Add the click listener for the map
        googleMapInstance.current.addListener("click", async (event: any) => {
          const latitude = event.latLng.lat();
          const longitude = event.latLng.lng();
          const placeID = event.placeId;

          if (placeID) {
            // Get the place detail (name, address) through PlaceService
            const request = {
              placeId: placeID,
              fields: ["name", "formatted_address"],
            };
            const dummyDiv = document.createElement("div");
            const placesService = new PlacesService(dummyDiv);

            placesService.getDetails(request, (place, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                const name = place?.name ?? "";
                const address = place?.formatted_address ?? "";
                setLocationData({
                  name,
                  address,
                  latitude,
                  longitude,
                  placeID,
                });
              }
              googleMapInstance.current.panTo({
                lat: latitude,
                lng: longitude,
              });
            });
          } else {
            // Handle cases without a place ID
            setLocationData({
              name: "",
              address: "",
              latitude,
              longitude,
              placeID: "",
            });
            googleMapInstance.current.panTo({ lat: latitude, lng: longitude });
          }
        });
      } catch (error) {
        console.error("Error loading Google Maps", error);
      }
    };

    loadMap();
  }, []);

  // Change the viewState after clicking any spot on the map
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

  // Smoothly transition after viewState changes
  useEffect(() => {
    if (googleMapInstance.current) {
      googleMapInstance.current.panTo({
        lat: viewState?.latitude,
        lng: viewState?.longitude,
      });
    }
  }, [viewState]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100vh", position: "relative" }}
    />
  );
}

// Define the interface of the placeDetail component
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

// Weather information in the placeDetail
function Weather({
  longitude,
  latitude,
}: {
  longitude: number | undefined;
  latitude: number | undefined;
}) {
  // Set the state
  const [weatherInfo, setWeatherInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Set the style of the weather information block
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    mb: 1,
    p: 1,
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  // fetch weather data through the public API
  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);

      const params = {
        latitude: latitude,
        longitude: longitude,
        daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
        timezone: "auto",
      };

      const url = "https://api.open-meteo.com/v1/forecast";

      try {
        const response = await axios.get(url, { params });
        const data = response.data;

        if (!data || !data.daily) {
          throw new Error("Daily data not found in the response");
        }

        setWeatherInfo(data.daily);
      } catch (error) {
        setError("Error fetching weather data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [longitude, latitude]);

  return (
    <Box
      sx={{
        mt: 3,
        borderRadius: "8px",
        maxWidth: "100%",
      }}
    >
      <Typography gutterBottom sx={{ fontWeight: 600 }}>
        Weather Forecast
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        weatherInfo?.time?.map((date: any, i: number) => (
          <Box key={i} sx={style}>
            <Typography variant="body1" sx={{ minWidth: "12ch" }}>
              {date.slice(5)}
            </Typography>
            <Typography variant="body1" sx={{ minWidth: "15ch" }}>
              {weatherInfo.temperature_2m_min[i].toFixed(1)}°C ~{" "}
              {weatherInfo.temperature_2m_max[i].toFixed(1)}°C
            </Typography>
            <Typography variant="body1" sx={{ minWidth: "15ch" }}>
              Precipitation: {weatherInfo.precipitation_sum[i].toFixed(1)} mm
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
}

// Place details powered by Google Map
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
  // Set the states
  const [placeData, setPlaceData] = useState<Place | null>();
  const [OpenColumnList, setOpenColumnList] = useState("none");

  // Import mapContext states and functions
  const mapContext = useMapContext();
  const {
    locationData,
    userItineraryData,
    setUserItineraryData,
    setMapDetailOpen,
  } = mapContext;

  // Pop up box to choose which column to add the card
  const HandleOpenColumnList = () => {
    if (OpenColumnList === "none") {
      setOpenColumnList("block");
    } else {
      setOpenColumnList("none");
    }
  };

  // Fetch data about place details
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
        const dummyDiv = document.createElement("div");
        const placesService = new PlacesService(dummyDiv);

        placesService.getDetails(request, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place) {
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

  // If locationData changes, automatically open the place detail box
  useEffect(() => {
    if (locationData) setMapDetailOpen(true);
  }, [locationData]);

  // Add a card by with the placeDetail information of the tourist attraction
  const UpdateItinerary = async (column: string) => {
    if (locationData) {
      // Get the list of all values' id
      const idArray = Object.values(userItineraryData).flatMap((column) =>
        column.map((item) => item.id)
      );

      //const maxID = idArray.length > 0 ? Math.max(...idArray) : 0;
      const newCardID =
        idArray.length > 0
          ? (Array.from(
              { length: Math.max(...idArray) + 1 },
              (_, index) => index + 1
            ).find((i) => !idArray.includes(i)) as number)
          : 1;

      const newCard: Card = {
        id: newCardID,
        name: locationData.name,
        placeID: locationData.placeID,
        address: locationData.address,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        img: placeData?.photos[0],
      };

      console.log(newCard);
      setUserItineraryData((preState: any) => ({
        ...preState,
        [column]: [...preState[column], newCard],
      }));

      setOpenColumnList("none");
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
            <Typography sx={{ py: 2 }}>More on Google Maps</Typography>
          </Link>
        )}
        {/*<PlaceOverview place={locationData?.placeID}>
          <PlaceDirectionsButton slot="action">
            Directions
          </PlaceDirectionsButton>
        </PlaceOverview>*/}
        <Divider />
        <Weather
          longitude={locationData?.longitude}
          latitude={locationData?.latitude}
        />
      </Box>
    </div>
  );
}

import { useContext, createContext } from "react";
import { useRouter } from "next/navigation";
interface MapContextType {
  locationData: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    placeID: string;
  } | null;
  setLocationData: (
    data: {
      name: string;
      address: string;
      latitude: number;
      longitude: number;
      placeID: string;
    } | null
  ) => void;
  tripID: string;
  setTripID: (data: string) => void;
  userItineraryData: UserCardsData;
  setUserItineraryData: (data: any) => void;
  mapDetailOpen: boolean;
  setMapDetailOpen: (data: boolean) => void;
  itineraryWindowExpanded: boolean;
  setItineraryWindowExpanded: (data: boolean) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

const MapProvider: React.FC<{ children: React.ReactNode; params: any }> = ({
  children,
  params,
}) => {
  const [locationData, setLocationData] = useState<{
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    placeID: string;
  } | null>(null);

  const [userItineraryData, setUserItineraryData] = useState<UserCardsData>({});
  const [tripID, setTripID] = useState(params.tripID);
  const { data: session } = useSession();
  const email = session?.user?.email;

  //use hook to fetch UserCardData
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const response = await axios.get("/api/itinerarydata", {
            params: { email, tripID },
          });
          if (response.status === 200) {
            setUserItineraryData(response.data.data.data);
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
        tripID,
        setTripID,
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
export default function RenderDom({ params }: { params: any }) {
  return (
    <SessionWrapper>
      <MapProvider params={params}>
        <ItineraryPage />
      </MapProvider>
    </SessionWrapper>
  );
}
