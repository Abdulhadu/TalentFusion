import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "auto", // Adjusted height to maintain aspect ratio
  width: "250px", // Increased width for a bigger logo
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/images/logos/telent-fussion-logo.png" alt="logo" height={50} width={200} priority />
    </LinkStyled>
  );
};

export default Logo;
