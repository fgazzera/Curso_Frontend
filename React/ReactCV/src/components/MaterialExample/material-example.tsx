import { useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardActions,
  Button,
  Snackbar,
  IconButton,
} from "@mui/material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./material-example.module.css";

// --- Styled Card with border + hover ---
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  transition: "transform .15s ease, box-shadow .15s ease",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[6],
  },
}));

type Item = { id: number; title: string; desc: string; liked: boolean };

const INITIAL_ITEMS: Item[] = [
  { id: 1, title: "Card 1", desc: "First item description", liked: false },
  { id: 2, title: "Card 2", desc: "Second item description", liked: true },
  { id: 3, title: "Card 3", desc: "Third item description", liked: false },
  { id: 4, title: "Card 4", desc: "Fourth item description", liked: false },
];

export default function MaterialExample() {
  const [primary, setPrimary] = useState<"indigo" | "teal" | "deeporange">(
    "indigo"
  );
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [toast, setToast] = useState<string | null>(null);

  // theme changes with state
  const theme = useMemo(() => {
    const primaryMap = {
      indigo: { main: "#3f51b5" },
      teal: { main: "#009688" },
      deeporange: { main: "#ff5722" },
    };
    return createTheme({
      palette: {
        primary: primaryMap[primary],
      },
      shape: { borderRadius: 12 },
      typography: {
        fontSize: 14,
        h6: { fontWeight: 700 },
      },
    });
  }, [primary]);

  // filter items
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q)
    );
  }, [items, query]);

  const toggleLike = (id: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, liked: !it.liked } : it))
    );
    const nowLiked = items.find((it) => it.id === id)?.liked === false;
    setToast(nowLiked ? "Added to favorites" : "Removed from favorites");
  };

  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <AppBar position="sticky" color="primary" sx={{ mb: 3 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Material UI example
            </Typography>
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="primary-label" sx={{ color: "inherit" }}>
                Primary
              </InputLabel>
              <Select
                labelId="primary-label"
                label="Primary"
                value={primary}
                onChange={(e) => setPrimary(e.target.value as typeof primary)}
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,.6)",
                  },
                }}
              >
                <MenuItem value="indigo">Indigo</MenuItem>
                <MenuItem value="teal">Teal</MenuItem>
                <MenuItem value="deeporange">Deep Orange</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>

        <Container sx={{ display: "grid", gap: 3, pb: 5 }}>
          <TextField
            label="Search items"
            placeholder="Type to filter..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={{
              "& .MuiInputBase-root": { borderRadius: 999 },
            }}
          />
          <div className={styles.cardsGrid}>
            {filtered.map((item) => (
              <div className={styles.cardWrapper} key={item.id}>
                <StyledCard sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ mt: "auto", px: 2, pb: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setToast(`Open ${item.title}`)}
                      sx={{
                        textTransform: "none",
                        borderRadius: 999,
                        px: 2,
                      }}
                    >
                      Open
                    </Button>

                    <Button
                      size="small"
                      color={item.liked ? "secondary" : "inherit"}
                      onClick={() => toggleLike(item.id)}
                      startIcon={
                        item.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />
                      }
                      sx={{
                        ml: "auto",
                        borderRadius: 999,
                        "&.MuiButton-root": {
                          ...(item.liked
                            ? {}
                            : {
                                border: "1px solid",
                                borderColor: "divider",
                              }),
                        },
                      }}
                    >
                      {item.liked ? "Liked" : "Like"}
                    </Button>
                  </CardActions>
                </StyledCard>
              </div>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className={styles.noResults}>
              <Typography color="text.secondary">No results</Typography>
            </div>
          ) : null}
        </Container>
        <Snackbar
          open={!!toast}
          autoHideDuration={2200}
          onClose={() => setToast(null)}
          message={toast || ""}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setToast(null)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </ThemeProvider>
    </div>
  );
}




