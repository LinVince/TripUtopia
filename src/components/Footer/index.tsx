"use client";
import * as React from "react";
import { AppBar, Box, Button, Container, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import IconButton from "@mui/material/IconButton";

const inter = Inter({ subsets: ["latin"] });
{
  /*const pages = [
  { name: "Home", href: "/" },
  { name: "Team", href: "/Team" },
  { name: "Contact", href: "/Contact" },
];*/
}

const legal = [
  { text: "Terms", href: "/Terms" },
  { text: "Privacy", href: "/Privacy" },
  { text: "Cookie Policy", href: "/Cookies" },
  { text: "Trademark", href: "/Trademark" },
  { text: "Disclaimer", href: "/Disclaimer" },
];

function Footer() {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <AppBar
      sx={{
        backgroundColor: "#0A113B",
        position: "static",
        width: "100%", // Ensure the AppBar spans the full width
      }}
    >
      <Container maxWidth="xl">
        {/* Md-size view first row*/}
        <Box
          display={{ xs: "none", md: "flex" }}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          {/* For Logo Md-size view */}
          <Box
            p={5}
            sx={{
              flex: "1 1 30%",
              display: "flex",
              alignItems: "center",
              mr: 1,
            }}
          >
            <Image
              src="/logo_w.png"
              alt="Logo"
              width={250}
              height={150}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                height: "auto",
                width: "150px",
              }}
            />
          </Box>
          {/* For Menu Md-size view */}
          <Box
            sx={{
              flex: "1 1 100%",
              display: "flex",
              justifyContent: "end", // Spacing the buttons evenly
              alignItems: "center",
            }}
          >
            <IconButton
              component="a"
              href="https://www.instagram.com/triputopia1000?igsh=MTlmcXowcGd5em41Mg==" // Replace with your IG account link
              target="_blank" // Opens link in a new tab
              sx={{
                color: "white", // Customize the color as needed
              }}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
            {/*pages.map((page) => (
              <Button
                component={Link}
                href={page.href}
                key={page.name}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontFamily: inter.style.fontFamily,
                  fontWeight: 300,
                  fontSize: "18px",
                }}
              >
                {page.name}
              </Button>
            ))*/}
          </Box>
          {/* Follow Us Md-size view */}
          <Box
            sx={{
              flex: "1 1 0%",
              display: "flex",
              justifyContent: "end",
            }}
          ></Box>
          {/* Md-size view first row ends */}
        </Box>
        {/*Md-size view second row starts */}
        <Box
          display={{ xs: "none", md: "flex" }}
          width="100%"
          justifyContent="space-between"
          pb={5}
        >
          {/*Legal Buttons */}
          <Box display="flex">
            {legal.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target="_blank"
                style={{
                  textAlign: "center",
                  margin: 10,
                }}
              >
                <Typography color="#acacac" variant="body1">
                  {item.text}
                </Typography>
              </Link>
            ))}
          </Box>
          {/*Copyright Content */}
          <Box>
            <Typography
              color="#acacac"
              m={2}
              display="inline"
              textAlign="right"
            >
              &copy; {new Date().getFullYear()} TripUtopia. All rights reserved.
            </Typography>
          </Box>
        </Box>
        {/* Md-size view second row ends */}
        {/* Mobile-size view */}

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/*Mobile-size Logo*/}
          <Box width="100%" display="flex" justifyContent="center" py={5}>
            <Image
              src="/logo_w.png"
              alt="Logo"
              width={100}
              height={100}
              style={{
                height: "auto",
                width: "150px",
              }}
            />
          </Box>
          {/*Mobile-size Menu */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {" "}
            <IconButton
              component="a"
              href="https://www.instagram.com/triputopia1000?igsh=MTlmcXowcGd5em41Mg==" // Replace with your IG account link
              target="_blank" // Opens link in a new tab
              sx={{
                color: "white", // Customize the color as needed
              }}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
            {/*pages.map((page) => (
              <Button
                component={Link}
                href={page.href}
                key={page.name}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontFamily: inter.style.fontFamily,
                  fontWeight: 300,
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                {page.name}
              </Button>
            ))*/}
          </Box>
          {/*Mpbile-size Legal Buttons */}
          <Box>
            {legal.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target="_blank"
                style={{ textAlign: "center" }}
              >
                <Typography color="#acacac" variant="body1" my={3}>
                  {item.text}
                </Typography>
              </Link>
            ))}
          </Box>
          {/*Mobile-size Copyright Content */}
          <Box>
            <Typography color="#acacac" m={2} textAlign="center">
              &copy; {new Date().getFullYear()} TripUtopia. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}

export default Footer;
