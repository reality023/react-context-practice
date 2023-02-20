import "./styles/reset.css";

import { createContext, useContext, useMemo, useState } from "react";

const CounterValueContext = createContext();
const CounterActionsContext = createContext();

const useCounterValue = () => {
	const value = useContext(CounterValueContext);
	if (value === undefined) {
		throw new Error("useCounterState must be used within a CounterProvider");
	}
	return value;
};

const useCounterActions = () => {
	const value = useContext(CounterActionsContext);
	if (value === undefined) {
		throw new Error("useCounterState must be used within a CounterProvider");
	}
	return value;
};

const CounterProvider = ({ children }) => {
	const [counter, setCounter] = useState(0);
	const actions = useMemo(
		() => ({
			increment: () => setCounter((current) => current + 1),
			decrement: () => setCounter((current) => current - 1),
		}),
		[]
	);

	return (
		<CounterActionsContext.Provider value={actions}>
			<CounterValueContext.Provider value={counter}>{children}</CounterValueContext.Provider>
		</CounterActionsContext.Provider>
	);
};

const App = () => {
	return (
		<CounterProvider>
			<GrandParent />;
		</CounterProvider>
	);
};

export default App;

const GrandParent = () => {
	return <Parent />;
};

const Parent = () => {
	return <Child />;
};

const Child = () => {
	return <GrandChild />;
};

const GrandChild = () => {
	console.log("render GrandChild");
	const actions = useCounterActions();
	return (
		<div>
			<Message />
			<button onClick={() => actions.decrement()}>-1</button>
			<button onClick={() => actions.increment()}>+1</button>
		</div>
	);
};

const Message = () => {
	console.log("render Message");
	const counter = useCounterValue();
	return <div>Received: {counter}</div>;
};
