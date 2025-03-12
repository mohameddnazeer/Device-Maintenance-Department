import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function searchParamsToObject(searchParams) {
  const obj = {};
  searchParams.forEach((value, key) => {
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  });
  return obj;
}

// delete keys from search params
export function deleteKeysFromSearchParams(keys, prevParams) {
  const searchParams = new URLSearchParams(prevParams);
  keys.forEach((key) => searchParams.delete(key));
  return searchParams;
}

// set search params from regular object to URLSearchParams object
export function objectToSearchParamsStr(obj, prevParams) {
  const searchParams = new URLSearchParams(prevParams);
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      searchParams.set(key, obj[key].join(","));
    } else if (!obj[key]) {
      searchParams.delete(key);
    } else {
      searchParams.set(key, obj[key]);
    }
  }
  return searchParams;
}

// set search params from regular object to URLSearchParams object
export function objectToSearchParams(obj, prevParams) {
  const searchParams = new URLSearchParams(prevParams);
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((value) => searchParams.append(key, value));
    } else {
      searchParams.set(key, obj[key]);
    }
  }
  return searchParams;
}

export const fetchData = async (endpoint) => {
  if (!process.env.REACT_APP_API_URL)
    throw new Error("Please set REACT_APP_API_URL Environment Variable");
  const url = process.env.REACT_APP_API_URL.concat(endpoint);
  const res = await fetch(url);
  return await res.json();
};

export const getFacetedUniqueValues = () => {
  return ["office", "department", "gate", "region"];
};
