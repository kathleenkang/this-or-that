import React, { Dispatch, useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import axios from "axios";

import { Dispatch, SetStateAction } from "react";

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

type TagsProps = {
  tags: Array<string>;
  setTags: Dispatch<SetStateAction<string>>;
};

export default function Tags({ tags, setTags }: TagsProps) {
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
      setOptions(
        [...options, ...res.data.tags].filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
      );
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
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
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
            // onChange={(values) => {
            setTags(values);
            setShowPlaceholder(false);
          }}
          defaultValue={tags}
        />
      </Stack>
    </ThemeProvider>
  );
}
