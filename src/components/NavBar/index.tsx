"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";

const inter = Inter({ subsets: ["latin"] });
const pages = [
  /*{ name: "Home", href: "/" },
  { name: "Team", href: "/Team" },*/
  { name: "Contact", href: "./#contact" },
];
//const pages_m = [...pages, { name: "Contact", href: "/Contact" }];
const pages_m = [...pages];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [loaded, setLoaded] = React.useState(false);
  const pathName = usePathname();
  const appBarRef = React.useRef<HTMLDivElement>(null);
  const navLinksRef = React.useRef<HTMLDivElement>(null);
  const navLinks = navLinksRef.current?.querySelectorAll("button");

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getLinkProps = (href: string) => ({
    component: Link,
    href,
    sx: {
      my: 2,
      display: "block",
      textTransform: "none",
      fontFamily: inter.style.fontFamily,
      fontWeight: pathName === href ? "400" : "300",
      fontSize: "14px",
      letterSpacing: "0.4em",
    },
  });

  React.useEffect(() => {
    setLoaded(true);

    // GSAP Scroll-triggered animation
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;

      if (scrollY >= screenHeight) {
        // Animate to solid background
        gsap.to(appBarRef.current, {
          backgroundColor: "#ffffffee", // Solid whilte background
          duration: 0.5,
          ease: "power2.out",
          color: "#353535",
        });
      } else {
        // Animate back to transparent
        gsap.to(appBarRef.current, {
          backgroundColor: "#ffffff00", // Semi-transparent background
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      ref={appBarRef}
      position="fixed"
      sx={{ zIndex: 1035, backgroundColor: "#00000000", boxShadow: "None" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Md-size view */}
          <Box
            sx={{
              flex: "0 1 25%",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              mr: 1,
              mt: 1,
            }}
          >
            <Image
              src="/logo_b.png"
              alt="Logo"
              width={100}
              height={100}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                height: "auto",
                width: "100px",
              }}
            />
          </Box>
          {/* For Menu Md-size view */}
          <Box
            ref={navLinksRef}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
              alignItems: "center",
              flexGrow: 1,
              gap: 15,
              pr: 10,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                {...getLinkProps(page.href)}
                onClick={handleCloseNavMenu}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {/*Contact Button Md-size view*/}
          {/* <Box
            sx={{
              flex: "0 1 25%",
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            {loaded && (
              <Button
                component={Link}
                href="/Contact"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  fontFamily: inter.style.fontFamily,
                  fontWeight: 300,
                  fontSize: "18px",
                }}
                className="gradient-border"
              >
                Contact Us
              </Button>
            )}
          </Box>*/}
          {/* Mobile-size view */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages_m.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    href={page.href}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Mobile-size Logo */}
          <Box
            sx={{
              flex: "0 1 25%",
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "end",
              mr: 1,
            }}
          >
            <Image
              src="/logo_b.png"
              alt="Logo"
              width={100}
              height={100}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                height: "auto",
                width: "50px",
              }}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
