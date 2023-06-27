import { Box } from '@mui/material'
import React from 'react'

export default function BillPopUp() {
  return (
    <Box
    width="50vw"
    height="70vh"
    position={"absolute"}
    zIndex={12}
    left="7%"
    top="20%"
    borderRadius="20px"
    bgcolor="black"
    border="1px solid #333333"
  >
  <Box height="20%">

  </Box>

  <Box height="80%" overflow="scroll" bgcolor="#2c2c2c">

  </Box>
   
  </Box>
  )
}
