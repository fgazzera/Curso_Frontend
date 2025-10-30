import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthHook";

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const goToCv = () => navigate("/");
  const goToForm = () => navigate("/form");
  const goToLogin = () => navigate("/login");
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isCvRoute = location.pathname === "/";
  const isFormRoute = location.pathname === "/form";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100" }}>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: 600, letterSpacing: 1 }}
          >
            CV React - Angular Developer
          </Typography>
          <Box sx={{ ml: "auto", display: "flex", gap: 1.5 }}>
            {user ? (
              <>
                {!isCvRoute ? (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={goToCv}
                  >
                    Ver CV
                  </Button>
                ) : null}
                {!isFormRoute ? (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={goToForm}
                  >
                    Formulario
                  </Button>
                ) : null}
                <Button color="inherit" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                variant={location.pathname === "/login" ? "outlined" : "text"}
                onClick={goToLogin}
              >
                Iniciar sesión
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
