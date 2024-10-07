import * as React from "react";
import Banner from "@/components/Banner";
import { Box, Typography } from "@mui/material";
import AnimatedPointSphere from "@/components/DotSpere3D";
import CookieConsent from "@/components/CookieConsent";
import Image from "next/image";
import { cookies } from "next/headers";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const cookieStore = cookies();
  const consent = cookieStore.get("consent");
  const hasConsent = !!consent;

  return (
    <>
      <Banner />
      {/*Text and Photo Area */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/*Text Area on the left */}
        <Box flex="1 1 50%" flexDirection="column" p={{ xs: 8, md: 8 }}>
          <Typography className="tiny_heading">WHO WE ARE</Typography>
          <Typography className="body_heading">
            Members of TripUtopia
          </Typography>
          <Typography className="body_p">
            We are a group of passionate travellers and culture explorers
            connected through this big, diverse country - UK.
          </Typography>
        </Box>
        {/*Photo Area on the right (only desktop) */}
        <Box
          sx={{ flex: "1 1 50%", p: 5 }}
          display={{ xs: "block", md: "flex" }}
        >
          <Image
            src="/group_travel.png"
            alt="scenary"
            width={600}
            height={600}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
        {/*Text Area Dark Background */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={{ xs: 5, md: 10 }}
          position="relative"
        >
          <Image
            src="/river_sunset.jpg"
            alt="scenary"
            width={600}
            height={600}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          />
          <Box id="text_area" width={{ xs: "100%", md: "50%" }}>
            <Typography className="tiny_heading_dark" textAlign="center">
              WHAT WE DO
            </Typography>
            <Typography className="body_heading_dark" textAlign="center">
              Join Our Adventure
            </Typography>
            <Typography className="body_p_dark">
              As students and young professionals, we want to create a platform
              for like-minded people to share and connect on our passion to
              discover the global world we live in.
            </Typography>
            <Typography className="body_p_dark">
              Starting from small meet-up groups in local areas to planned
              outings in national parks across the country… or even a trip
              abroad to far east Asia! If this sounds like your cup of tea,
              don’t hesitate to contact us to find out more! Come and join us
              for a range of different activities!
            </Typography>
          </Box>
        </Box>
      </Box>
      {/*Text and 3D Object Area */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/*3D Area on the left (only desktop) */}
        <Box
          flex="1 1 50%"
          justifyContent="center"
          display={{ xs: "none", md: "flex" }}
        >
          <AnimatedPointSphere width={600} height={450} />
        </Box>
        {/*3D Area at the top (only middle-size device) */}
        <Box
          flex="1 1 50%"
          justifyContent="center"
          display={{ xs: "flex", md: "none" }}
        >
          <AnimatedPointSphere width={400} height={300} />
        </Box>
        {/*Text Area on the right */}
        <Box
          flex="1 1 50%"
          flexDirection="column"
          p={{ xs: 5, md: 10 }}
          alignItems="flex-start"
        >
          <Typography className="tiny_heading">WHERE WE ARE</Typography>
          <Typography className="body_heading">
            Leave Your Mark on the World
          </Typography>
          <Typography className="body_p">
            Embark on a global adventure where every spin of our 3D sphere
            symbolizes the footprints we leave behind. As you connect with
            fellow explorers, let your passion for discovery inspire others to
            trace their stories across the globe. Together, let's create a
            tapestry of experiences, memories, and connections that transcend
            boundaries. Join us in this vibrant community and make your mark!
          </Typography>
        </Box>
        <CookieConsent hasConsent={hasConsent} />
        <Box
          id="contact"
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <ContactForm />
        </Box>
      </Box>
    </>
  );
}
