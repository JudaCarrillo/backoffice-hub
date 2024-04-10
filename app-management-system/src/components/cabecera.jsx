import styled from "styled-components"

export function Cabecera({title, children }){
    return(
        <Container>
            <div className="Headboard">
                <h1 className="Headboard-title">
                    {title}
                </h1>
                <div className="button_lado">
                    {children }
                </div>
            </div>
            
        </Container>
    );
}

const Container = styled.div`
    position:relative;
    width: 98%;
    height: 160px;
    top: 20px;
    padding: 10px 40px 10px 40px;
    margin: 10px;
    
    .Headboard{
        
        border-radius: 1rem;
        width:100%;
        height:100%;
        background: ${(props)=>props.theme.bg};
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 30px 0px 70px; 
        box-shadow: .3rem .5rem .4rem #00000040;

        .Headboard-title{
            color: ${(props)=>props.theme.text};
        }

    }
    
    .button_lado{
        display: flex;
        gap: 20px;
        
    }
    
`;
