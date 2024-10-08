import { Box, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import MuxPlayer from "@mux/mux-player-react";

const inter = Inter({ subsets: ["latin"] });

export default function Banner() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "800px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <MuxPlayer
          playbackId="ABNeBhFbSsQinvd00exe9xo7RDw6XihstAH7DtfBLIAs"
          streamType="on-demand"
          autoPlay
          muted
          loop
          style={{
            width: "100%", // Makes the video stretch to the full width of the container
            height: "120vh", // Keeps the video at the full viewport height
            objectFit: "cover", // Crops the sides of the video to maintain the height
            position: "absolute", // Ensures the video stays in a fixed position
            top: 0,
            left: 0,
          }}
        />
        {/*<Image
          src="/background_video.gif"
          alt=""
          width={1200}
          height={800}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />*/}
        {/*<video
          src={require("../../../public/background_video.mp4")}
          autoPlay
          muted
          loop
          style={{
            width: "100%", // Makes the video stretch to the full width of the container
            height: "120vh", // Keeps the video at the full viewport height
            objectFit: "cover", // Crops the sides of the video to maintain the height
            position: "absolute", // Ensures the video stays in a fixed position
            top: 0,
            left: 0,
          }}
        ></video>*/}

        <Box className="gradient_mask" />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2, // Ensures text is above the image
          }}
        >
          <Typography
            sx={{
              color: "#ffffffaa",
              fontWeight: "700",
              fontFamily: inter.style.fontFamily,
              fontSize: { xs: "30px", md: "40px" },
              textAlign: "center",
              letterSpacing: "0.3em",
              mb: 2,
              px: 2,
            }}
          >
            Explore, Connect, Discover
          </Typography>
          <Typography
            sx={{
              color: "#ffffffaa",
              fontWeight: "400",
              fontFamily: inter.style.fontFamily,
              fontSize: { xs: "20px", md: "24px" },
              textAlign: "center",
              letterSpacing: "0.2em",
              px: 2,
            }}
          >
            Join a community of passionate travelers and culture explorers
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
