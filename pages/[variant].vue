<template>
  <div>
    <h1>abort controller demo</h1>
    <pre>{{ JSON.stringify(data, null, 2) }}</pre>
  </div>
</template>

<script setup>
const fetchOne = (signal) =>
  $fetch("/api/demo", {
    signal,
  });

const fetchTwo = async (signal) => {
  return $fetch("http://localhost:3000/api/demo", {
    signal,
  });
};

const fetchThree = async (signal) => {
  const resp = await fetch("http://localhost:3000/api/demo", {
    signal,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return resp.json();
};

const fetchFour = (signal) =>
  new Promise((resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(new DOMException("Aborted", "AbortError"));
    });

    return $fetch("/api/demo", {
      signal,
    }).then(resolve);
  });

const FETCH_DATA = {
  one: fetchOne,
  two: fetchTwo,
  three: fetchThree,
  four: fetchFour,
};
const fetchData = FETCH_DATA[useRoute().params.variant];

const fetchChunks = async () => {
  const chunks = [];
  const abortController = new AbortController();

  const fetchChunk = async (i) => {
    try {
      const data = await fetchData(abortController.signal);
      abortController.abort();
      return data;
    } catch (error) {
      if (error?.name === "AbortError") {
        console.log(`Aborted: ${i}`);
      }
    }
    return null;
  };
  for (let i = 0; i < 10; i++) {
    chunks.push(fetchChunk(i));
  }
  return Promise.all(chunks);
};

const data = useState("demodata", () => null);
if (!data.value) {
  data.value = await fetchChunks();
}
</script>
