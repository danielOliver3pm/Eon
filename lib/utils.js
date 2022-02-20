import axios from "axios";

export const formatCurrency = (amount = 0, currency = "NZD") =>
  new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency,
    minimumIntegerDigits: 2,
  }).format(amount / 100);

export const isClient = typeof window === "object";

export const fetcher = (url) => axios.get(url).then((res) => res.data);
