import React from "react";
import { Dialog, DialogContent, Button, Box } from "@mui/material";

const VideoModal = ({ open, onClose,  video }) => {
    console.log("video is: ", video )
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent>
      <Box sx={{ width: 800 }}>
        <video controls>
          <source src={video} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
