import notesModel from './notes_data.js';
import util from './alerts.js';

var ALERT_FREQ = 60*1000; //check for alerts per minute

class SendAlerts {
    constructor(props) {
        this.freq = ALERT_FREQ;
        setInterval(this.checkForAlerts, this.freq);
    }
  
    checkForAlerts(args) {
      if (notesModel.notes_list.length > 0) {
        let alertList = [];
        let curTime = Date.parse(new Date());
        notesModel.notes_list.forEach(function(note) {
          if (note.reminder.isRemind && note.reminder.remindTime < curTime) {
            alert("Note " + note.title + " is due by " + util.getDateString(note.reminder.remindTime))
          }
        });
      }
    }
  }
  
  const sendAlerts = new SendAlerts();
  export default sendAlerts;
