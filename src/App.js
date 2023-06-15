import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RegisterPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        
      </Switch>
    </Router>
  );
}

export default App;
