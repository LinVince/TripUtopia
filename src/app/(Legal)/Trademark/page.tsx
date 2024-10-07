import React from "react";
import {
  Container,
  Typography,
  Link,
  Box,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

const TrademarkLegal: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={20} mb={10}>
        <Typography variant="h4" gutterBottom sx={{ ...inter.style, mt: 4 }}>
          Trademark Legal Notice
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Last updated October 12, 2024
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          This Trademark Legal Notice provides information regarding the
          trademarks, service marks, and trade names owned or licensed by
          TripUtopia. (&quot;Organization,&quot; &quot;we,&quot; &quot;us,&quot;
          and &quot;our&quot;) that are used on our website located at
          https://triputopia.com (&quot;Website&quot;). The use of these
          trademarks is governed by the terms set forth below.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Ownership of Trademarks
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          The trademarks, service marks, and trade names displayed on the
          Website, including but not limited to TripUtopia., the TripUtopia
          logo, and any associated brand names, are registered and unregistered
          trademarks of TripUtopia. These trademarks are protected by trademark
          laws and other intellectual property laws.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Use of Trademarks
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          You are not permitted to use any of our trademarks, service marks, or
          trade names without the prior written consent of TripUtopia, except as
          provided by applicable law. Unauthorized use of these trademarks may
          violate trademark laws, unfair competition laws, and other applicable
          laws.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Third-Party Trademarks
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          The Website may also contain trademarks, service marks, and trade
          names that are owned by third parties. These trademarks are the
          property of their respective owners and are used by us under license
          or other agreements. Nothing on the Website should be construed as
          granting, by implication, estoppel, or otherwise, any license or right
          to use any third-party trademark displayed on the Website without the
          prior written consent of the third-party owner.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Reporting Trademark Violations
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          If you believe that any content on the Website infringes your
          trademark rights, please contact us with sufficient information for us
          to evaluate your claim. We take trademark violations seriously and
          will address your concerns in accordance with applicable laws.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Changes to This Notice
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We may update this Trademark Legal Notice from time to time to reflect
          changes in our trademark portfolio or legal requirements. Please
          review this page periodically for updates. The date at the top of this
          page indicates when it was last updated.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          If you have any questions or concerns regarding this Trademark Legal
          Notice or our trademarks, please contact us.
        </Typography>
      </Box>
    </Container>
  );
};

export default TrademarkLegal;
