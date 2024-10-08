import React from "react";
import {
  Container,
  Typography,
  Link,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={20} mb={10}>
        <Typography variant="h4" gutterBottom sx={{ ...inter.style, mt: 4 }}>
          Cookie Policy
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Last updated October 12, 2024
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          This Cookie Policy explains how TripUtopia (&quot;Organization,&quot;
          &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;) uses cookies and
          similar technologies to recognize you when you visit our website at
          https://triputopia.co.uk (&quot;Website&quot;). It explains what these
          technologies are and why we use them, as well as your rights to
          control our use of them.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In some cases we may use cookies to collect personal information, or
          that becomes personal information if we combine it with other
          information.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          What are cookies?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners in order to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Cookies set by the website owner (in this case, Qinvicta Inc.) are
          called &quot;firstparty cookies.&quot; Cookies set by parties other
          than the website owner are called &quot;thirdparty cookies.&quot;
          Third-party cookies enable third-party features or functionality to be
          provided on or through the website (e.g., advertising, interactive
          content, and analytics). The parties that set these third-party
          cookies can recognize your computer both when it visits the website in
          question and also when it visits certain other websites.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Why do we use cookies?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We use first- and third-party cookies for several reasons. Some
          cookies are required for technical reasons in order for our Website to
          operate, and we refer to these as &quot;essential&quot; or
          &quot;strictly necessary&quot; cookies. Other cookies also enable us
          to track and target the interests of our users to enhance the
          experience on our Online Properties. Third parties serve cookies
          through our Website for advertising, analytics, and other purposes.
          This is described in more detail below.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          How can I control cookies?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          You have the right to decide whether to accept or reject cookies. You
          can exercise your cookie rights by setting your preferences in the
          Cookie Consent Manager. The Cookie Consent Manager allows you to
          select which categories of cookies you accept or reject. Essential
          cookies cannot be rejected as they are strictly necessary to provide
          you with services.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          The Cookie Consent Manager can be found in the notification banner and
          on our website. If you choose to reject cookies, you may still use our
          website though your access to some functionality and areas of our
          website may be restricted. You may also set or amend your web browser
          controls to accept or refuse cookies.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          The specific types of first- and third-party cookies served through
          our Website and the purposes they perform are described in the table
          below (please note that the specific cookies served may vary depending
          on the specific Online Properties you visit):
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          How can I control cookies on my browser?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          As the means by which you can refuse cookies through your web browser
          controlsvary from browser to browser, you should visit your
          browser&apos;s help menu for moreinformation. The following is
          information about how to manage cookies on the mostpopular browsers:
        </Typography>
        <List>
          <Link
            href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies"
            target="_blank"
          >
            <ListItem>Chrome</ListItem>
          </Link>
          <Link
            href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d"
            target="_blank"
          >
            <ListItem>Internet Explorer</ListItem>
          </Link>
          <Link
            href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US"
            target="_blank"
          >
            <ListItem>Firefox</ListItem>
          </Link>
          <Link
            href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac"
            target="_blank"
          >
            <ListItem>Safari</ListItem>
          </Link>
          <Link
            href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd"
            target="_blank"
          >
            <ListItem>Edge</ListItem>
          </Link>

          <Link
            href="https://help.opera.com/en/latest/web-preferences/"
            target="_blank"
          >
            <ListItem>Opera</ListItem>
          </Link>
        </List>
        <Typography variant="body1" paragraph sx={inter.style}>
          In addition, most advertising networks offer you a way to opt out of
          targetedadvertising. If you would like to find out more information,
          please visit:
        </Typography>
        <List>
          <Link
            href="https://optout.aboutads.info/?c=2&lang=EN"
            target="_blank"
          >
            <ListItem>Digital Advertising Alliance</ListItem>
          </Link>
          <Link href="https://youradchoices.ca/" target="_blank">
            <ListItem>Digital Advertising Alliance of Canada</ListItem>
          </Link>
          <Link href="https://www.youronlinechoices.com/" target="_blank">
            <ListItem>
              European Interactive Digital Advertising Alliance
            </ListItem>
          </Link>
        </List>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          What about other tracking technologies, like webbeacons?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Cookies are not the only way to recognize or track visitors to a
          website. We may useother, similar technologies from time to time, like
          web beacons (sometimes called&quot;tracking pixels&quot; or
          &quot;clear gifs&quot;). These are tiny graphics files that contain a
          uniqueidentifier that enables us to recognize when someone has visited
          our Website oropened an email including them . This allows us, for
          example, to monitor the trafficpatterns of users from one page within
          a website to another, to deliver orcommunicate with cookies, to
          understand whether you have come to the websitefrom an online
          advertisement displayed on a third-party website, to improve
          siteperformance, and to measure the success of email marketing
          campaigns. In manyinstances, these technologies are reliant on cookies
          to function properly, and sodeclining cookies will impair their
          functioning.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Do you use Flash cookies or Local Shared Objects?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Websites may also use so-called &quot;Flash Cookies&quot; (also known
          as Local SharedObjects or &quot;LSOs&quot;) to, among other things,
          collect and store information about youruse of our services, fraud
          prevention, and for other site operations. If you do not want Flash
          Cookies stored on your computer, you can adjust thesettings of your
          Flash player to block Flash Cookies storage using the toolscontained
          in the Website Storage Settings Panel . You can also control Flash
          Cookiesby going to the Global Storage Settings Panel and following the
          instructions (whichmay include instructions that explain, for example,
          how to delete existing FlashCookies (referred to
          &quot;information&quot; on the Macromedia site), how to prevent
          FlashLSOs from being placed on your computer without your being asked,
          and (for FlashPlayer 8 and later) how to block Flash Cookies that are
          not being delivered by theoperator of the page you are on at the
          time). Please note that setting the Flash Player to restrict or limit
          acceptance of FlashCookies may reduce or impede the functionality of
          some Flash applications,including, potentially, Flash applications
          used in connection with our services oronline content.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Do you serve targeted advertising?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Third parties may serve cookies on your computer or mobile device to
          serveadvertising through our Website. These companies may use
          information about yourvisits to this and other websites in order to
          provide relevant advertisements aboutgoods and services that you may
          be interested in. They may also employ technologythat is used to
          measure the effectiveness of advertisements. They can accomplishthis
          by using cookies or web beacons to collect information about your
          visits to thisand other sites in order to provide relevant
          advertisements about goods and servicesof potential interest to you.
          The information collected through this process does notenable us or
          them to identify your name, contact details, or other details that
          directlyidentify you unless you choose to provide these.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          How often will you update this Cookie Policy?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We may update this Cookie Policy from time to time in order to
          reflect, for example,changes to the cookies we use or for other
          operational, legal, or regulatory reasons.Please therefore revisit
          this Cookie Policy regularly to stay informed about our use ofcookies
          and related technologies. The date at the top of this Cookie Policy
          indicates when it was last updated.
        </Typography>
        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Where can I get further information?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          If you have any questions about our use of cookies or other
          technologies, please contact us.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
