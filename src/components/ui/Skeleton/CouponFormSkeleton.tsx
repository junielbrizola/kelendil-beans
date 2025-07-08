import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function CouponFormSkeleton() {
  return (
    <Box>
      {Array.from({ length:7 }).map((_,i)=>(
        <Skeleton key={i} variant="rectangular" height={56} sx={{ mb:2 }}/>
      ))}
      <Box display="flex" justifyContent="flex-end">
        <Skeleton variant="rectangular" width={160} height={48}/>
      </Box>
    </Box>
  );
}
