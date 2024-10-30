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

const PrivacyPolicy: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box mt={20} mb={10}>
        <Typography variant="h4" gutterBottom sx={{ ...inter.style, mt: 4 }}>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Last updated October 12, 2024
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          This privacy notice for TripUtopia. (&quot;we,&quot; &quot;us,&quot;
          or &quot;our&quot;), describes how and why we might collect, store,
          use, and/or share (&quot;process&quot;) your information when you use
          our services (&quot;Services&quot;), such as when you:
        </Typography>
        <List sx={inter.style}>
          <ListItem>
            <Typography variant="body1">
              - Visit our website at
              <Link href="/"> https://triputopia.co.uk</Link>, or any website of
              ours that links to this privacy notice
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body1">
              - Engage with us in other related ways, including any sales,
              marketing, or events
            </Typography>
          </ListItem>
        </List>
        <Typography variant="body1" paragraph sx={inter.style}>
          Questions or concerns? Reading this privacy notice will help you
          understand your privacy rights and choices. If you do not agree with
          our policies and practices, please do not use our Services.
        </Typography>

        <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
          Summary
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          This summary provides key points from our privacy notice, but you can
          find out more details about any of these topics by clicking the link
          following each key point or by using our table of contents below to
          find the section you are looking for.
        </Typography>
        <Box my={10}>
          <Typography variant="h5" sx={{ ...inter.style, mt: 4 }} gutterBottom>
            Table of Contents
          </Typography>
          <List sx={inter.style}>
            <ListItem>1. What information do we collect?</ListItem>
            <ListItem>2. How do we process your information?</ListItem>
            <ListItem>
              3. What legal bases do we rely on to process your personal
              information?
            </ListItem>
            <ListItem>
              4. When and with whom do we share your personal information?
            </ListItem>
            <ListItem>
              5. Do we use cookies and other tracking technologies?
            </ListItem>
            <ListItem>6. How long do we keep your information?</ListItem>
            <ListItem>7. How do we keep your information safe?</ListItem>
            <ListItem>8. What are your privacy rights?</ListItem>
            <ListItem>9. Controls for do-not-track features</ListItem>
            <ListItem>
              10. Do United States residents have specific privacy rights?
            </ListItem>
            <ListItem>11. Do we make updates to this notice?</ListItem>
            <ListItem>12. How can you contact us about this notice?</ListItem>
            <ListItem>
              13. How can you review, update, or delete the data we collect from
              you?
            </ListItem>
          </List>
          <Divider />
        </Box>

        <Typography
          variant="h5"
          id="what-information-do-we-collect"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          1. What information do we collect?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          <strong>Personal information you disclose to us</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: We collect personal information that you provide to us.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We collect personal information that you voluntarily provide to us
          when you express an interest in obtaining information about us or our
          products and Services, when you participate in activities on the
          Services, or otherwise when you contact us.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          <strong>Personal Information Provided by You.</strong> The personal
          information that we collect depends on the context of your
          interactions with us and the Services, the choices you make, and the
          products and features you use. The personal information we collect may
          include the following:
        </Typography>
        <List sx={inter.style}>
          <ListItem>1. names</ListItem>
          <ListItem>2. email addresses</ListItem>
          <ListItem>3. job titles</ListItem>
          <ListItem>4. usernames</ListItem>
          <ListItem>5. phone numbers</ListItem>
        </List>
        <Typography variant="body1" paragraph sx={inter.style}>
          <strong>Sensitive Information.</strong> We do not process sensitive
          information.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </Typography>

        <Typography variant="body1" paragraph sx={inter.style}>
          <strong>Information automatically collected</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: Some information — such as your Internet Protocol (IP)
          address and/or browser and device characteristics — is collected
          automatically when you visit our Services.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We automatically collect certain information when you visit, use, or
          navigate the Services. This information does not reveal your specific
          identity (like your name or contact information) but may include
          device and usage information, such as your IP address, browser and
          device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how
          and when you use our Services, and other technical information. This
          information is primarily needed to maintain the security and operation
          of our Services, and for our internal analytics and reporting
          purposes.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Like many businesses, we also collect information through cookies and
          similar technologies. You can find out more about this in our Cookie
          Notice: <Link href="/Cookies">https://triputopia.co.uk/Cookies</Link>.
        </Typography>

        <Typography
          variant="h5"
          id="how-do-we-process-your-information"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          2. How do we process your information?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: We process your information to provide, improve, and
          administer our Services, communicate with you, for security and fraud
          prevention, and to comply with law. We may also process your
          information for other purposes with your consent.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </Typography>
        <List sx={inter.style}>
          <ListItem>
            - To request feedback. We may process your information when
            necessary to request feedback and to contact you about your use of
            our Services.
          </ListItem>
          <ListItem>
            - To send you marketing and promotional communications. We may
            process the personal information you send to us for our marketing
            purposes, if this is in accordance with your marketing preferences.
            You can opt out of our marketing emails at any time. For more
            information, see &quot;WHAT ARE YOUR PRIVACY RIGHTS?&quot; below.
          </ListItem>
          <ListItem>
            - To save or protect an individual&apos;s vital interest. We may
            process your information when necessary to save or protect an
            individual&apos;s vital interest, such as to prevent harm.
          </ListItem>
        </List>

        <Typography
          variant="h5"
          id="what-legal-bases-do-we-rely-on-to-process-your-personal-information"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          3. What legal bases do we rely on to process your personal
          information?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: We process your personal information only when we have a
          valid legal reason to do so. In some regions, such as the European
          Economic Area (EEA), we are required to notify you of the legal bases
          we rely on to process your personal information.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We may process your personal information if you have given us your
          consent (e.g., by opting in to receive marketing communications), if
          we need to perform a contract with you, or if we have a legal
          obligation to do so. We may also process your information if it is in
          our legitimate interests, such as for business or marketing purposes,
          as long as this does not override your rights and interests.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          For residents of the EEA or Switzerland, our processing of your
          personal information is justified based on the following legal bases:
        </Typography>
        <List sx={inter.style}>
          <ListItem>
            - Consent: We may process your information if you have given us
            consent to do so for a specific purpose.
          </ListItem>
          <ListItem>
            - Contract: We may process your information to fulfill a contract
            with you, such as providing you with the Services.
          </ListItem>
          <ListItem>
            - Legal Obligation: We may process your information if we are
            required to do so to comply with legal obligations.
          </ListItem>
          <ListItem>
            - Legitimate Interests: We may process your information if it is in
            our legitimate interests, such as for business or marketing
            purposes, provided this does not override your rights and interests.
          </ListItem>
        </List>

        <Typography
          variant="h5"
          id="when-and-with-whom-do-we-share-your-personal-information"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          4. When and with whom do we share your personal information?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: We may share information in specific situations described in
          this section and/or with the following third parties.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We may need to share your personal information in the following
          situations:
        </Typography>
        <List sx={inter.style}>
          <ListItem>
            - Business Transfers. We may share or transfer your information in
            connection with, or during negotiations of, any merger, sale of
            company assets, financing, or acquisition of all or a portion of our
            business to another company.
          </ListItem>
          <ListItem>
            - Vendors, Consultants, and Other Third-Party Service Providers. We
            may share your information with third-party vendors, service
            providers, contractors, or agents who perform services for us or on
            our behalf and require access to such information to do that work.
            Examples include payment processing, data analysis, email delivery,
            hosting services, customer service, and marketing efforts.
          </ListItem>
          <ListItem>
            - Business Partners. We may share your information with our business
            partners to offer you certain products, services, or promotions.
          </ListItem>
        </List>
        <Typography
          variant="h5"
          id="do-we-use-cookies-and-other-tracking-technologies"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          5. Do we use cookies and other tracking technologies?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: We may use cookies and other tracking technologies to
          collect and store your information.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We may use cookies and similar tracking technologies (like web beacons
          and pixels) to access or store information. You can learn more about
          this in our Cookie Notice:{" "}
          <Link href="/Cookies" sx={inter.style}>
            https://triputopia.co.uk/Cookies
          </Link>
          .
        </Typography>

        <Typography
          variant="h5"
          id="how-long-do-we-keep-your-information"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          6. How long do we keep your information?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: We keep your information for as long as necessary to fulfill
          the purposes outlined in this privacy notice unless a longer retention
          period is required or permitted by law.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than 1
          year.
        </Typography>

        <Typography
          variant="h5"
          id="how-do-we-keep-your-information-safe"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          7. How do we keep your information safe?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: We aim to protect your personal information through a system
          of organizational and technical security measures.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We have implemented appropriate technical and organizational security
          measures designed to protect the security of any personal information
          we process. However, despite our safeguards and efforts to secure your
          information, no electronic transmission over the Internet or
          information storage technology can be guaranteed to be 100% secure, so
          we cannot promise or guarantee that hackers, cybercriminals, or other
          unauthorized third parties will not be able to defeat our security and
          improperly collect, access, steal, or modify your information.
        </Typography>

        <Typography
          variant="h5"
          id="what-are-your-privacy-rights"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          8. What are your privacy rights?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: You may review, change, or terminate your account at any
          time. You may also have rights to access, correct, or delete your
          personal information.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Depending on your location, you may have the following rights
          regarding your personal information:
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          <strong>Access:</strong>
          <br />
          You may have the right to access and obtain a copy of your personal
          information.
        </Typography>

        <Typography variant="body1" paragraph sx={inter.style}>
          <strong>Correction:</strong>
          <br />
          You may have the right to request that we correct or update your
          personal information.
        </Typography>

        <Typography variant="body1" paragraph sx={inter.style}>
          <strong>Deletion:</strong>
          <br />
          You may have the right to request that we delete your personal
          information.
        </Typography>

        <Typography variant="body1" paragraph sx={inter.style}>
          <strong>Objection:</strong>
          <br />
          You may have the right to object to our processing of your personal
          information.
        </Typography>

        <Typography variant="body1" paragraph sx={inter.style}>
          To exercise these rights, please contact us using the information
          provided in the section &quot;How can you contact us about this
          notice?&quot; below.
        </Typography>

        <Typography
          variant="h5"
          id="controls-for-do-not-track-features"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          9. Controls for do-not-track features
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: We do not currently respond to &quot;Do Not Track&quot;
          signals.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Most web browsers and some mobile operating systems include a
          Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to
          signal your preference not to have data about your online browsing
          activities monitored and collected. At this time, no uniform
          technology standard for recognizing and implementing DNT signals has
          been finalized. As such, we do not currently respond to DNT browser
          signals or any other mechanism that automatically communicates your
          choice not to be tracked online. If a standard for online tracking is
          adopted that we must follow in the future, we will inform you about
          that practice in a revised version of this privacy notice.
        </Typography>

        <Typography
          variant="h5"
          id="do-united-states-residents-have-specific-privacy-rights"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          10. Do United States residents have specific privacy rights?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: Yes, if you are a resident of California, you have specific
          rights regarding your personal information.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          California Civil Code Section 1798.83, also known as the &quot;Shine
          The Light&quot;law, permits our users who are California residents to
          request and obtain from us, once a year and free of charge,
          information about categories of personal information (if any) we
          disclosed to third parties for direct marketing purposes in the
          preceding calendar year. If you are a California resident and would
          like to make such a request, please submit your request in writing to
          us using the contact information provided below.
        </Typography>

        <Typography
          variant="h5"
          id="do-we-make-updates-to-this-notice"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          11. Do we make updates to this notice?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          In Short: Yes, we will update this notice as necessary to stay
          compliant with relevant laws.
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          We may update this privacy notice from time to time in order to stay
          compliant with relevant laws. We will notify you of any changes by
          posting the new privacy notice on this page. You are advised to review
          this privacy notice periodically for any changes. Changes to this
          privacy notice are effective when they are posted on this page.
        </Typography>

        <Typography
          variant="h5"
          id="how-can-you-contact-us-about-this-notice"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          12. How can you contact us about this notice?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          If you have questions or comments about this notice, you may contact
          us via{" "}
          <Link href="/Contact" sx={inter.style}>
            our contact form.
          </Link>
        </Typography>

        <Typography
          variant="h5"
          id="how-can-you-review-update-or-delete-the-data-we-collect-from-you"
          sx={{ ...inter.style, mt: 4 }}
          gutterBottom
        >
          13. How can you review, update, or delete the data we collect from
          you?
        </Typography>
        <Typography variant="body1" paragraph sx={inter.style}>
          Based on the applicable laws of your jurisdiction, you may have the
          right to request access to the personal information we hold about you,
          to have it corrected or deleted, or to limit or restrict how we use
          it. To exercise these rights, please contact us.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
