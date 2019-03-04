import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import DateTimePicker from 'react-datetime-picker';
import notesModel from './notes_data.js';
import sendAlerts from './alerts.js';
import util from './utils.js';

import close from './close.png';
import info from './info.jpg';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

var id = 1;

function ItemButton(props) {
  return(
    <div>
      <button className="item-button" id={props.item.id} onClick={props.onClick}>
        {props.item.name}
      </button>
    </div>
  );
}

class SideContainer extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(event) {
    this.props.changeScreen(event.target.id);
  }

  updateButtonColor() {
    let keys = ["notes", "completed"];
    for (let idx in keys) {
      let modal_ele = document.getElementById(keys[idx]);
      if (keys[idx] === this.props.screenId) {
        modal_ele.style["background-color"] = "#f3ea9a";
      }
      else{
        modal_ele.style["background-color"] = "#ffffff";    
      }
    }
  }

  componentDidMount(args) {
    this.updateButtonColor();
  }

  componentDidUpdate(args) {
    this.updateButtonColor();
  }

  render() {
    let item_list = []
    for (let i in items) {
      let item = items[i]
      let ele = <ItemButton key ={item.id} item={item} onClick={(event)=>this.handleClick(event)}/>
      item_list.push(ele)
    }
    return(
      <div className="side-container">
        {item_list}
      </div>
    );
  }  
}

class CustomTextArea extends Component {
  constructor(props) {
    super(props);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  textAreaAdjust() {
    const node = ReactDOM.findDOMNode(this);
    let style = getComputedStyle(node);
    node.style = style;
    node.style.height = (node.scrollHeight)+"px";
  }

  componentDidMount(args) {
    this.textAreaAdjust();
  }

  handleTitleChange(event) {
    this.props.handleTitleChange(event.target.value);
    this.textAreaAdjust()
  }

  render() {
    let cn = this.props.note.isCompleted ? "note-title-completed" : "note-title";
    return(
      <textarea className={cn} placeholder="Add New Note..." value={this.props.note.title} 
        onChange={this.handleTitleChange}/>
    );
  }
}

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.note,
      current_note: this.props.current_note,
      showModal: false
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleNoteInfo = this.handleNoteInfo.bind(this);
    this.handleNoteRemove = this.handleNoteRemove.bind(this);
  }

  handleTitleChange(title) {
    let note = this.state.note;
    note.title = title;
    note.lastEdited = Date.parse(new Date());
    this.props.updateNote(note);
  }

  handleCheckboxChange(event) {
    let note = this.state.note;
    note.isCompleted = event.target.checked;
    this.props.updateNote(note);
  }

  modalDataChange(note) {
    this.setState({
      ["showModal"]: false
    });
    if (this.state.note.id !== id) {
      this.props.updateNote(note);
    }
  }

  handleNoteInfo(event) {
    this.setState({
      ["showModal"]: true
    });
  }

  handleNoteRemove(event) {
    let note = this.state.note
    note.deleted = true;
    this.props.updateNote(note)
  }

  render() {
    let reminderEle = <div></div>;
    if (this.state.note.reminder.isRemind) {
      let dStr = "ALERT:  " + util.getDateString(this.state.note.reminder.remindTime);
      let divStyle = {display: "inline-block"};
      reminderEle = <div style={divStyle}>{dStr}</div>
    }
    let modalContainer = <div></div>
    if (this.state.showModal) {
      modalContainer = <NoteModal note={this.state.note} onChange={(note)=>this.modalDataChange(note)}/>
    }
    return(
      <div className='note-container'>
        <div className="note-col-sm note-info">
          <img width={30} height={30} src={info} alt="" onClick={this.handleNoteInfo}/>
        </div>
        <div className="note-col-sm note-is-completed">
          <input name="isCompleted" type="checkbox" checked={this.state.note.isCompleted} onChange={this.handleCheckboxChange} />
        </div>
        <div className='note-col-lg'>
          <CustomTextArea note={this.props.note} handleTitleChange={(title)=>this.handleTitleChange(title)}/>
        </div>
        <div className="note-col-sm note-remove">
          <img width={30} height={30} src={close} alt="" onClick={this.handleNoteRemove}/>
        </div>
        {reminderEle}
        <div id={"modal-container" + this.state.note.id} className="modal-container">
          {modalContainer}
        </div>
      </div>
    );
  }
}

class NoteModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: this.props.note,
      selectedDate: this.props.note.reminder.remindTime
    };
    this.onChange = this.onChange.bind(this)
  }

  onChange(date) {
    console.log(date)
    this.setState({note:this.state.note, selectedDate: Date.parse(date)});
  }

  validateDate(date) {
    if (!date) 
      return false
    let curTime = Date.parse(new Date());
    if (curTime >= date)
      return false
    return true
  }

  formatDate(date) {
    let newDate = (date) ? new Date(date) : new Date();
    return newDate;
  }

  closeModal(){
    this.props.onChange(this.state.note);
  }

  removeReminder() {
    let note = this.state.note;
    note.reminder.remindTime = null;
    note.reminder.isRemind = false;
    this.setState({note:note, selectedDate: this.state.selectedDate});
  }
  
  saveReminder() {
    let note = this.state.note;
    if (this.validateDate(this.state.selectedDate)) {
      note.reminder.isRemind = true;
      note.reminder.remindTime = this.state.selectedDate;
      this.setState({note:note, selectedDate: this.state.selectedDate});
    } else {
      alert("You can't Set Reminder of old Date");      
    }
  }

  render() {
    let curReminder = <div></div>
    if (this.state.note.reminder.isRemind === true) {
      let dStr = util.getDateString(this.state.note.reminder.remindTime);
      curReminder = <div className="current-reminder">
        Current: {dStr}
        <span className="span-button" onClick={()=>{this.removeReminder()}}> Remove </span>
        <br/>
        <br/>
      </div>
    }

    return(
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header-container">
            <h5 className="modal-header-label"> Manage Alerts </h5>
            <span className="modal-close" onClick={()=>{this.closeModal()}}>
              Close
            </span>
          </div>
          {curReminder}
          <div className="AddReminder">
            <label className="date-picker label"> Add Alert </label><br/>
            <div className="date-picker">
              <DateTimePicker onChange={this.onChange} value={this.formatDate(this.state.selectedDate)}/>
            </div>
            <br/>
            <span className="span-button" onClick={()=>{this.saveReminder()}}> Save </span>
          </div>
        </div>
      </div>
    );
  } 
}

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: notesModel.notes_list,
      current_note: id
    };
  }

  updateNote(note) {
    let notes = this.state.notes;
    let current_note = note.id;
    let sortedNotes = [];
    if (!note.deleted) {
      sortedNotes.push(note);
    }

    for (let i in notes) {
      if (notes[i].id !== note.id) {
        sortedNotes.push(notes[i]);
      }
    }

    if (current_note === id) {
      id++
    }

    this.setState({
        notes: sortedNotes,
        current_note: current_note
    });
    notesModel.notes_list = sortedNotes;
  }

  getNotes(completed=false) {
    let note_list = [];
    for (let idx in this.state.notes) {
      let note = this.state.notes[idx];
      if (note.isCompleted === completed) {
        let note_ele = <Note key={note.id} note={note} current_note={this.state.current_note} 
                              updateNote={(note)=>this.updateNote(note)}/>;
        note_list.push(note_ele);
      }
    }
    if (completed && note_list.length === 0) {
      note_list.push(<CompletedMessage key={'key'}/>);
    }
    return(note_list);
  }

  render() {
    let note_list = [];
    if (this.props.screenId === 'notes') {
      let emptyNote = notesModel.noteObject();
      emptyNote.id = id;
      note_list = [<Note key={emptyNote.id} note={emptyNote} current_note={this.state.current_note} 
                          updateNote={(note)=>this.updateNote(note)}/>];
      note_list.push(...this.getNotes());
    } 
    else {
      note_list.push(...this.getNotes(true));
    }

    return(
      <div className="custom-container">
        {note_list}
      </div>
    );
  }
}

function CompletedMessage() {
  let divStyle = {"textAlign": "center", padding: "10px"};
  return(
    <div> <br/><br/>
      <div style={divStyle}>Your Completed Notes Will Appear Here!</div>
    </div>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      screenId: 'notes'
    };
  }

  changeScreen(screenId) {
    this.setState({screenId: screenId});
  }

  render() {
    return (
      <Row>
        <Col lg={3} xs={12} className="app-container-side"> 
          <SideContainer screenId={this.state.screenId} changeScreen={(screenId)=>this.changeScreen(screenId)}/> 
        </Col>
        <Col lg={9} xs={12} className="app-container-main"> <MainContainer screenId={this.state.screenId}/> </Col>
      </Row>
    );
    // return (
    //   <div>
    //     <div className="app-container-side col-3"> 
    //       <SideContainer screenId={this.state.screenId} changeScreen={(screenId)=>this.changeScreen(screenId)}/> 
    //     </div>
    //     <div className="app-container-main col-9"> <MainContainer screenId={this.state.screenId}/> </div>
    //   </div>
    // );
  }
}

export default App;

var items = [
  {
    id: 'notes',
    name: 'Notes'
  },
  {
    id: 'completed',
    name: 'Completed'
  }
];
