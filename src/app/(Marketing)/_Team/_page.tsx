import * as React from "react";
import { Box, Typography } from "@mui/material";
import BannerTeam from "@/components/BannerTeam";

export default function Home() {
  return (
    <>
      <BannerTeam />

      {/*Text Area Light Background */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={{ xs: 5, md: 10 }}
        sx={{ background: "#FFFFFF" }}
      >
        <Box id="text_area" width={{ xs: "100%", md: "50%" }}>
          <Typography className="tiny_heading" textAlign="center">
            TEAM
          </Typography>
          <Typography className="body_heading" textAlign="center">
            Meet Our Experts
          </Typography>
          <Typography className="body_p">
            Welcome to Qinvicta, where technological innovation meets scientific
            excellence. Our team is comprised of highly skilled professionals,
            each a leader in their respective field, working together to advance
            the frontiers of post-quantum cryptography (PQC) and cybersecurity.
          </Typography>
          <Typography className="body_p">
            At Qinvicta, our diverse group of experts combines deep knowledge
            and experience to drive forward-thinking solutions. Our specialists
            in PQC are dedicated to developing cutting-edge silicon IPs for IC
            design companies, ensuring robust, quantum-resistant security
            measures.
          </Typography>
          <Typography className="body_p">
            Driven by a relentless pursuit of excellence and an unyielding
            passion for discovery, we transform futuristic concepts into
            practical, impactful solutions. Our commitment to innovation not
            only advances the field of cybersecurity but also paves the way for
            a safer, more secure digital future for everyone.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
