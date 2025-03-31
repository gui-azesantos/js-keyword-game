import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./App.css";

const jsKeywords: string[] = [
  "var",
  "let",
  "const",
  "function",
  "if",
  "else",
  "switch",
  "case",
  "default",
  "for",
  "while",
  "do",
  "break",
  "continue",
  "return",
  "try",
  "catch",
  "finally",
  "throw",
  "class",
  "extends",
  "super",
  "import",
  "export",
  "new",
  "delete",
  "typeof",
  "instanceof",
  "void",
  "yield",
  "await",
  "async",
];

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [foundKeywords, setFoundKeywords] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const answer = input.trim().toLowerCase();
    if (jsKeywords.includes(answer) && !foundKeywords.includes(answer)) {
      setFoundKeywords((prev) => [...prev, answer]);
    }
    setInput("");
  };

  const renderKeyword = (keyword: string) => (
    <Grid item xs={4} sm={3} key={keyword}>
      <Paper elevation={3} className="keyword-box">
        {foundKeywords.includes(keyword) ? keyword : "_".repeat(keyword.length)}
      </Paper>
    </Grid>
  );

  return (
    <Container className="App">
      <Typography variant="h3" gutterBottom>
        Jogo: Palavras-chave do JavaScript
      </Typography>

      <Box display="flex" justifyContent="center" mb={4}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={60}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={() => setIsPlaying(false)}
        >
          {({ remainingTime }) => (
            <Typography variant="h5">{remainingTime} segundos</Typography>
          )}
        </CountdownCircleTimer>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="center" mb={4}>
          <TextField
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!isPlaying}
            placeholder="Digite uma palavra-chave do JavaScript..."
            fullWidth
            color="primary"
            style={{ color: "white !important" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isPlaying}
          >
            Enviar
          </Button>
        </Box>
      </form>

      <Grid container spacing={2} justifyContent="center">
        {jsKeywords.map(renderKeyword)}
      </Grid>

      {!isPlaying && (
        <Box mt={4} textAlign="center">
          <Typography variant="h4" color="error">
            Fim de jogo!
          </Typography>
          <Typography variant="h6">
            Você descobriu {foundKeywords.length} de {jsKeywords.length}{" "}
            palavras.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default App;
