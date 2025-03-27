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
  keys.forEach(key => searchParams.delete(key));
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
      obj[key].forEach(value => searchParams.append(key, value));
    } else {
      searchParams.set(key, obj[key]);
    }
  }
  return searchParams;
}

export const fetchData = async endpoint => {
  const accessToken = window.localStorage.getItem("accessToken");
  const url = getUrl() + endpoint;

  const res = accessToken
    ? await fetch(url, { headers: { Authorization: `bearer ${accessToken}` } })
    : await fetch(url);
  if (res.ok) return await res.json();
  return res;
};

export const getUrl = () => {
  if (!process.env.REACT_APP_API_URL)
    throw new Error("Please set REACT_APP_API_URL Environment Variable");
  return new URL(process.env.REACT_APP_API_URL);
};

export const getFacetedUniqueValues = () => {
  return ["office", "department", "gate", "region"];
};
