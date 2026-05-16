import { useState } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import "./App.css";
import NewContext from './Nc';

const App = () => {
    //State for cards
    const [cards, setCards] = useState([]);
    //State for filterStatus
    const [filterStatus, setFilterStatus] = useState('all');
    //State for msg display
    const [isMsgDisplay, setIsMsgDisplay] = useState(true);

    //function to set new Cards
    const addCard = (todoName, todoDis) => {
        setCards([...cards, { id: Date.now(), todoName, todoDis, status: 'notCompleted' }]);
    };

    //function to change card status when card status is updated
    const changeStatus = (id, newStatus) => {
        setCards(cards.map(card => card.id === id ? { ...card, status: newStatus } : card));
    };

    const updateEditedName = (id,newValue) => {
        setCards(cards.map(card => card.id === id ? { ...card, todoName: newValue } : card));
    }
    const updateEditedDescription = (id,newValue) => {
        setCards(cards.map(card => card.id === id ? { ...card, todoDis: newValue } : card));
    }

    //function to delete card from cards
    const deleteCard = (id) => {
        setCards(cards.filter(card => card.id !== id));
    };

    //function to filter cards based on user input
    const filterCards = () => {
        return cards.filter(card => {
            if (filterStatus === 'all') {
                return true;
            } else if (filterStatus === 'notCompleted') {
                return card.status === 'notCompleted';
            } else {
                return card.status === 'completed';
            }
        });
    };

    return (
        <NewContext.Provider value={{updateEditedName,updateEditedDescription}}>
            <div className="container">
                <Header addCard={addCard} isMsgDisplay={isMsgDisplay} setIsMsgDisplay={setIsMsgDisplay} />
                <Main
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    cards={filterCards()}
                    deleteCard={deleteCard}
                    changeStatus={changeStatus}
                    isMsgDisplay={isMsgDisplay}
                />
            </div>
        </NewContext.Provider>
    );
};

export default App;