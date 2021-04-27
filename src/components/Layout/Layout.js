import React from 'react'
import './Layout.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_overrides.css'
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from "moment";
import 'moment/locale/ru'
import {tr} from "react-date-range/dist/locale";

const Layout = props => {
    const [state, setState] = React.useState(
        {
            leftDate: '07 февраля',
            rightDate: '22 февраля',
            count1: 1,
            count2: 1,
            count3: 1,
            startDate: null,
            endDate: null
        }
    );
    let className1, className2, className3
    className1 = className2 = className3 = 'quantity-arrow-minus'
    if (state.count1<2) className1 += ' disabledIcon'
    if (state.count2<2) className2 += ' disabledIcon'
    if (state.count3<2) className3 += ' disabledIcon'


    React.useEffect(()=>{
        moment.locale('ru')
    },[])
    const changeNumberOne = number => {
        setState(prev =>{
            return {
                ...prev,
                count1: state.count1 + number
            }
        }
        )
    }
    const changeNumberTwo = number => {
        setState(prev =>{
                return {
                    ...prev,
                    count2: state.count2 + number
                }
            }
        )
    }
    const changeNumberThree = (number) => {
        setState(prev =>{
                return {
                    ...prev,
                    count3: state.count3 + number
                }
            }
        )
    }

    return (
        <div className="bord">
            <div className="bord__container content">
                <form action="">
                    <div className="content__input">
                        <label htmlFor="">Место или название отеля</label>
                        <span className="input-icon">
                            <input type="text" placeholder="Введите здесь место" tabIndex="0"/>
                        </span>
                    </div>
                    <span className="border"></span>
                    <div className="content__time">
                       <div className="df"><span>Заезд</span><span>Выезд</span></div>
                        <DateRangePicker
                            showDefaultInputIcon
                            inputIconPosition="after"
                            startDatePlaceholderText={'07 февраля'}
                            endDatePlaceholderText={'22 февраля'}
                            noBorder
                            displayFormat="D MMMM"
                            startDate={state.startDate}
                            startDateId="your_unique_start_date_id"
                            endDate={state.endDate}
                            endDateId="your_unique_end_date_id"
                            onDatesChange={({ startDate, endDate }) => setState(prev=>{return {
                                ...prev,
                                startDate, endDate
                            }})}
                            focusedInput={state.focusedInput}
                            onFocusChange={focusedInput => setState(prev=>{return {
                                ...prev,
                                focusedInput
                            }})}
                        />
                    </div>
                    <span className="border"></span>
                    <div className="content__count">
                        <div className="content__count__column input-block">
                            <label htmlFor="">Номера</label>
                            <div className="input-block__item">
                                <input className="quantity-num" type="number" value={state.count1}/>
                                <span className="group">
                                    <input type="button" className="quantity-arrow-plus" onClick={()=>{
                                        changeNumberOne(1)
                                    }}></input>
                                    <input type="button" className={className1} disabled={state.count1<2} onClick={()=>{
                                        changeNumberOne(-1)
                                    }}></input>
                                </span>
                            </div>
                        </div>
                        <div className="content__count__column input-block">
                            <label htmlFor="">Взрослые</label>
                            <div className="input-block__item">
                                <input className="quantity-num" type="number" value={state.count2}/>
                                <span className="group">
                                    <input type="button" className="quantity-arrow-plus" onClick={()=>{
                                        changeNumberTwo(1)}}>
                                    </input>
                                    <input type="button" className={className2} disabled={state.count2<2} onClick={()=>{
                                        changeNumberTwo(-1)
                                    }}>
                                    </input>
                                </span>
                            </div>
                        </div>
                        <div className="content__count__column input-block">
                            <label htmlFor="">Дети</label>
                            <div className="input-block__item">
                                <input className="quantity-num" type="number" value={state.count3}/>
                                <span className="group">
                                <input type="button" className="quantity-arrow-plus" onClick={()=>{
                                    changeNumberThree(1)
                                }}></input>
                                <input type="button" className={className3} disabled={state.count3<2} onClick={()=>{
                                    changeNumberThree(-1)
                                }}></input>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className="content__submit" tabIndex="0">
                    </div>
                    <div className="content__search">
                        <button>Найти</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Layout