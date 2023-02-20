import styled from "styled-components";

const Test = (props) => {
	return (
		<div>
			<Div>{props.item.id}</Div>
			<BlueDiv>{props.item.content}</BlueDiv>
		</div>
	);
};

export default Test;

const Div = styled.div`
	color: red;
`;

const BlueDiv = styled.div`
	color: blue;
`;
