import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(22 163 74)",
    },
    background: {
      default: "rgb(243 244 246)",
    },
  },
});

// interface TagsProps {
//   tags: [];
//   setTags: [];
// }

// export default function Tags({ tags, setTags }: TagsProps) {
export default function Tags({ tags, setTags }) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [options, setOptions] = useState([
    "밸런스게임",
    "패션",
    "사진",
    "쇼핑",
    "디자인",
    "오늘뭐먹지?",
  ]);

  useEffect(() => {
    (async () => {
      const res = await axios(`${process.env.HOST}/api/tags`);
      setOptions(res.data.tags);
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <Autocomplete
          multiple
          id="tags-filled"
          options={options}
          freeSolo
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          sx={{
            background: "rgb(243 244 246)",
            borderRadius: "15px 15px 0px 0px",
            "& .MuiFilledInput-root": {
              background: "rgb(243 244 246)",
              borderRadius: "15px 15px 0px 0px",
              paddingTop: "28px",
              paddingBottom: "7px",
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="# 태그 (선택사항)"
              placeholder={
                showPlaceholder
                  ? "키워드 입력 후 Enter 키를 누르면 태그가 생성됩니다"
                  : ""
              }
              sx={{
                background: "rgb(243 244 246)",
                borderRadius: "15px 15px 0px 0px",
              }}
            />
          )}
          onChange={(event, values) => {
            setTags(values);
            setShowPlaceholder(false);
          }}
          defaultValue={tags}
        />
      </Stack>
    </ThemeProvider>
  );
}
