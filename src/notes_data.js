class NotesModel {
    constructor(props) {
        this.notes_list = [];
    }

    addNotes(note) {
        this.notes_list.push(note);
    }

    updateNotesList(notes) {
        this.notes_list = notes;
    }

    noteObject(props=null) {
        let note;
        note = {
            id: null,
            title: '',
            reminder: {
                isRemind: false,
                remindTime: null
            },
            alert: null,
            isCompleted: false,
            lastEdited:  0
        }
    
        if (props) {
            note.id = props.id;
            note.title = props.title;
            note.reminder = props.reminder;
            note.alert = props.alert;
            note.isCompleted = props.isCompleted;
            note.lastEdited = props.lastEdited;
        }
        return note;
    }
}

const notesModel = new NotesModel();
export default notesModel;


// class NoteData {
//     constructor(props) {
//         this.title = '';
//         this.reminder = {
//             isRemind: false,
//             remindTime: null
//         };
//         this.alert = null;
//         this.isCompleted = false;
//         this.lastEdited = 0;

//         if (props.note) {
//             this.title = props.title;
//             this.reminder = props.reminder;
//             this.alert = props.alert;
//             this.isCompleted = props.isCompleted;
//             this.lastEdited = props.lastEdited;
//         }
//     }
// }

// function noteObject(props) {
//     let note;
//     note = {
//         title: '',
//         reminder: {
//             isRemind: false,
//             remindTime: null
//         },
//         alert: null,
//         isCompleted: false,
//         lastEdited:  0
//     }

//     if (props) {
//         note.title = props.title;
//         note.reminder = props.reminder;
//         note.alert = props.alert;
//         note.isCompleted = props.isCompleted;
//         note.lastEdited = props.lastEdited;
//     }
//     return note;
// }

// var notes = [
//     {
//         title: 'this is the note, this is the note, this is the note, this is the note, this is the note',
//         reminder: {
//         isRemind: false,
//         remindTime: null
//         },
//         alerts: [],
//         isCompleted: false,
//         lastEdited: 0
//     },
//     {
//         title: 'this is the note, this is the note, this is the note, this is the note, this is the note',
//         reminder: {
//         isRemind: false,
//         remindTime: null
//         },
//         alerts: [],
//         isCompleted: false
//     },
//     {
//         title: 'this is the note3, this is the note, this is the note, this is the note, this is the note',
//         reminder: {
//         isRemind: false,
//         remindTime: null
//         },
//         alerts: [],
//         isCompleted: true
//     }
// ]
  
// const dbName = "test";
// const storeName = "notess";
// let db;

// let db_req = window.indexedDB.open(dbName, 4);

// db_req.onerror = function(event) {
//     console.log("note db error")
// };

// db_req.onsuccess = function(event) {
//     console.log("note db success")
//     db = event.target.result;
//     console.log(db)
//     var txn = db.transaction(storeName, "readwrite");
//     console.log(txn)
//     let obs = txn.objectStore(storeName)
//     console.log(obs)
//     notes.forEach(function(note) {
//         console.log(note)
//         var request = obs.add(note);
//         request.onsuccess = function(event) {
//             console.log("note added")
//           // event.target.result === customer.ssn;
//         };
//       });
//     // var objectStore = db.createObjectStore(storeName, { keyPath: "ssn" });
//     // console.log(db);
//     // console.log(objectStore)
//     // var objectStore = db.createObjectStore(storeName, { keyPath: "ssn" });
//     // console.log(db);
//     // console.log(objectStore)
// };

// db_req.onupgradeneeded = function(event) { 
//     db = event.target.result;
//     var objectStore = db.removeObjectStore(storeName, { keyPath: "lastEdited" });
//     console.log(db);
//     console.log(objectStore)
    
// }


// class DataStorage {
//     constructor(props) {
//       this.db = null
       
//   }
// }

// const ds = (new DataStorage());

// export default ds;

//   var items = [
//     {
//       id: 'notes',
//       name: 'Notes'
//     },
//     {
//       id: 'completed',
//       name: 'Completed'
//     }
//   ]