"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, MapPin, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocationResult {
  name: string;
  state?: string | null;
  country: string;
  latitude: number;
  longitude: number;
  timezone?: string | null;
}

interface LocationSearchProps {
  onSelect: (location: LocationResult) => void;
  initialValue?: string;
}