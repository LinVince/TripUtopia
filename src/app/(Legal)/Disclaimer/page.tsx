import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

const Disclaimer: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={20} mb={10}>
        <Typography variant="h4" gutterBottom sx={{ ...inter.style, mt: 4 }}>
          Disclaimer
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Last updated October 12, 2024
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Website Disclaimer
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          The information provided by TripUtopia. (&quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;) on https://triputopia.co.uk (the
          &quot;Site&quot;) is for general informational purposes only. All
          information on the Site is provided in good faith, however we make no
          representation or warranty of any kind, express or implied, regarding
          the accuracy, adequacy, validity, reliability, availability, or
          completeness of any information on the Site. UNDER NO CIRCUMSTANCE
          SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND
          INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY
          INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR
          RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK
        </Typography>{" "}
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Professional Disclaimer
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          The Site cannot and does not contain technology advice. The technology
          information is provided for general informational and educational
          purposes only and is not a substitute for professional advice.
          Accordingly, before taking any actions based upon such information, we
          encourage you to consult with the appropriate professionals. We do not
          provide any kind of technology advice. THE USE OR RELIANCE OF ANY
          INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.
        </Typography>
      </Box>
    </Container>
  );
};

export default Disclaimer;
