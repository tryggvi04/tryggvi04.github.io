const synth = new Tone.Synth().toDestination();
const notes = [["c4", "a"], ["d4", "s"], ["e4", "d"], ["c#4", "w"], ["d#4", "e"], ["f4", "f"], ["f#4", "t"], 
["g4", "g"], ["g#4", "y"], ["a4", "h"], ["bb4", "u"], ["b4", "j"], ["c5", "k"], ["d5", "l"], ["c#5", "o"], ["d#5", "p"], ["e5", ";"]];
const url = 'http://localhost:3000/api/v1/tunes';
let recording = false
let new_song = {}
let current_tunes = []
let start_time 

window.onload = () => {
  reset_option();
}
const start_recording = () => {
  recording = true;
  current_tunes = [];
  document.getElementById("recordbtn").disabled = true;
  document.getElementById("stopbtn").disabled = false;
  new_song = {
    name: null,
    tune: null
  }
  
}
const stop_recording = async () => {
  recording = false;
  const song_name = document.getElementById("recordName");
  start_time = null;
  document.getElementById("recordbtn").disabled = false;
  document.getElementById("stopbtn").disabled = true;
  new_song["tune"] = current_tunes;

  if (song_name.value === ""){
  new_song["name"] = "No-name Tune"
  }
  else{
  new_song["name"] = song_name.value
  }
  await axios.post(url, new_song);
  reset_option();
  
}

const playNotes = async() => {
    notes.forEach((note)=>{
      document.getElementById(note[0]).addEventListener("click", async () => {
        if (recording === true){
          if (start_time == null){
            start_time = Tone.now();
          }
          current_tunes.push(
          {
            note: note[0],
            duration: "8n",
            timing: Tone.now() - start_time
          });
        }

        await Tone.start();
        await synth.triggerAttackRelease(note[0], "8n");
      });

      document.addEventListener("keydown", async(event) => {
        if (event.key.toLowerCase() === note[1]){
          await Tone.start();
          await synth.triggerAttackRelease(note[0], "8n");
        }
      });
    
  })
}
playNotes()
const playTune = async (song) => {
  song["tune"].forEach(async(tune) => {
    await Tone.start();
    const now = Tone.now();
    await synth.triggerAttackRelease(tune["note"], tune["duration"], now + tune["timing"])
  });
};
const playSelected = async () => {
  try {
    let result;
    const response = await axios.get(url);
    const dropMenu = document.getElementById("tunesDrop");
    response.data.forEach(tune => {
      if (tune["id"] === dropMenu.value){
         result = tune;
      }
    });
    await playTune(result);
  }
  catch (error) {
    //When unsuccessful, print the error.
    console.log(error);
  }
}

const reset_option = async () => {
  const drop_down = document.getElementById("tunesDrop");
  const response = await axios.get(url);
  for (let i = 0; i < drop_down.length; i++) {
    drop_down[i].remove(0) == null;
  }
  drop_down.remove(0)
  response.data.forEach(tune => {
    var option = document.createElement("option");
    option.text = tune["name"];
    option.value = tune["id"];
    drop_down.add(option); 
  });
}