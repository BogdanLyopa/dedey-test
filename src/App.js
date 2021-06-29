import { useState } from 'react';
import Counter from './components/Counter/Counter';
import Container from './components/Container/Container';
import DatePicker from 'react-datepicker';
import FileDrop from './components/FileDrop/FileDrop';
import 'react-datepicker/dist/react-datepicker.css';
import { IoChevronDownSharp } from 'react-icons/io5';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import { FaRegCalendarAlt } from 'react-icons/fa';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = date => {
    setStartDate(date);
  };

  return (
    <div className="App">
      <Container>
        <form
          className="form"
          action="#"
          onSubmit={event => event.preventDefault()}
        >
          <div className="form__field form__field--line">
            <label htmlFor="search">Место или название отеля</label>

            <IoLocationOutline className="location-logo" />
            <input
              type="text"
              name="search"
              id="search"
              className="input"
              placeholder="Введите здесь место"
            />
          </div>
          <div className="form__field">
            <label htmlFor="">Заезд</label>
            <FaRegCalendarAlt className="calendar-logo" fill="#ed9915" />

            <DatePicker
              className="form__date"
              dateFormat="d MMMM"
              selected={startDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="form__field form__field--line">
            <label htmlFor="">Выезд</label>
            <DatePicker
              className="form__date form__date--end"
              dateFormat="d MMMM"
              selected={endDate}
              onChange={date => setEndDate(date)}
            />{' '}
            <IoChevronDownSharp className="ctrl" />
          </div>
          <div className="form__counters">
            <Counter type={'Номера'} startValue={1} />
            <Counter type={'Взрослые'} startValue={1} />
            <Counter type={'Дети'} startValue={0} />
          </div>
          <button type="button" className="button--add">
            <AiOutlinePlus className="icon-add" />
          </button>
          <button className="button--search" type="submit">
            Найти
          </button>
        </form>
      </Container>
      <Container>
        <FileDrop />
      </Container>
    </div>
  );
}

export default App;
