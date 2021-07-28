import { utilService } from '../../../services/util-service.js'
import {storageService} from '../../../services/storage-service.js'

export const noteService = {
    query,
    saveNote,
    removeNoteById,
    getNoteById,
    updateNoteStyleById,
    createNoteInfo,
    cloneNote,
    updateColorById
}


let gNotes;
const NOTES_KEY='notes'




function _createNotes(){

    const notes = [
        {
            id: utilService.makeId(),
            isPinned: true,
            title: 'Quote Of The Day ',
            type: 'NoteText',
            info: {
                txt: 'I Win Or I Learn -TB12'
            },
            style: {
                backgroundColor: '#F59B7C',
                color: '#B22222',
                fontSize:'20px',
                fontFamily:'Dancing Script',
                textAlign:'center'
            }
        },
        {
            id: utilService.makeId(),
            title: 'My New Fav Song ❤',
            isPinned: false,
            type: 'NoteVideo',
            info: {
                url: 'https://www.youtube.com/watch?v=8ucz_pm3LX8',
                title: '',
                videoId: '8ucz_pm3LX8'
            },
            style:{
                backgroundColor: '#FED776',
                color: '#ffffff',
                fontSize:'18px',
                fontFamily:'sans-serif',
                textAlign:'center'
            }
        },
        {
            id: utilService.makeId(),
            label: 'Todos',
            type: 'NoteTodo',
            title: 'To-Do List',
            isPinned: false,
            info: {
                todos: [{
                    txt: 'sleep',
                    id: utilService.makeId(),
                    doneAt: null
                },
                {
                    txt: 'Finish This Sprint',
                    id: utilService.makeId(),
                    doneAt: null
                },
                {
                    txt: `Don't Forget to eat (again)`,
                    id: utilService.makeId(),
                    doneAt: null
                }
            ]
        },
        style:{
            backgroundColor: '#F1F487',
            color: 'black',
            fontSize:'18px',
            fontFamily:'sans-serif',
            textAlign:'center'
        }
        
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        title: 'Be Like Mike',
        isPinned: true,
        info: {
            type: 'NoteImg',
            imgUrl: 'https://static01.nyt.com/images/2020/05/16/business/16JORDAN-01sub/16JORDAN-01sub-superJumbo.jpg',
            title: ''
        },
        style: {
            backgroundColor: '#F59B7C',
            color: '#FF0000',
            fontSize:'20px',
            
            fontFamily:'Goblin One',
            textAlign:'center'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        title: 'Next Vacay',
        isPinned: true,
        info: {
            type: 'NoteImg',
            imgUrl: 'https://s31606.pcdn.co/wp-content/uploads/2020/06/aerial-view-of-kualoa-area-of-oahu-hawaii-picture-id938335974-1.jpg',
            title: ''
        },
        style: {
            backgroundColor: '#8ED2CD',
            color: '#FFffff',
            fontSize:'20px',
            fontFamily:'sana-serif',
            textAlign:'center'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        title: 'Baliiiii',
        isPinned: true,
        info: {
            type: 'NoteImg',
            imgUrl: 'https://theworldtravelguy.com/wp-content/uploads/2020/05/DJI_0910-3.jpg',
            title: ''
        },
        style: {
            backgroundColor: '#C2ED98',
            color: '#FFffff',
            fontSize:'20px',
            
            fontFamily:'Dancing Script',
            textAlign:'center'
        }
    },
    {
        id: utilService.makeId(),
        isPinned: false,
        title: 'Reminder #1',
        type: 'NoteText',
        info: {
            txt: 'pay taxes '
        },
        style: {
            backgroundColor: '#Ffffff',
            color: '#121212',
            fontSize:'20px',
            fontFamily:'sans-serif',
            textAlign:'center'
        }
    },
    {
        id: utilService.makeId(),
        isPinned: false,
        title: 'New Recipe To Try',
        type: 'NoteText',
        info: {
            txt: `2 and 1/4 cups (280g) all-purpose flour (spoon & leveled)
            1 teaspoon baking soda
            1 and 1/2 teaspoons cornstarch*
            1/2 teaspoon salt
            3/4 cup (1.5 sticks or 170g) unsalted butter, melted & slightly cooled*
            3/4 cup (150g) packed light or dark brown sugar
            1/2 cup (100g) granulated sugar
            1 large egg + 1 egg yolk, at room temperature
            2 teaspoons pure vanilla extract
            1 and 1/4 cups (225g) semi-sweet chocolate chips or chocolate chunks`
        },
        style: {
            backgroundColor: '#Ffffff',
            color: '#121212',
            fontSize:'14px',
            fontFamily:'sans-serif',
            textAlign:'center'
        }
        
    },
    {
        id: utilService.makeId(),
        title: 'Some Zohar For The Soul',
        isPinned: true,
        type: 'NoteVideo',
        info: {
            url: 'https://www.youtube.com/watch?v=vcpgpEUlKfk',
            title: '',
            videoId: 'vcpgpEUlKfk'
        },
        style:{
            backgroundColor: '#98A9D7',
            color: '#ffffff',
            fontSize:'18px',
            fontFamily:'sans-serif',
            textAlign:'center'
        }
    }

    
    
]
gNotes=notes;
}

function query(filterBy) {
    const notes=storageService.loadFromStorage(NOTES_KEY)
    if(!notes|| !notes.length) _createNotes();
    else gNotes=notes


    if (!filterBy) return Promise.resolve(gNotes)
    const { txt } = filterBy
    const filteredNotes = gNotes.filter(note => {
        return _isNoteInFilter(note, txt)
    })
    return Promise.resolve(filteredNotes)
}

function getNoteById(noteId) {

    return Promise.resolve(gNotes.find(note => note.id === noteId))
}

function saveNote(note) {

    return note.id ? _updateNote(note) : _addNote(note)
}

function cloneNote(noteToClone){
    const clonedNote=JSON.parse(JSON.stringify(noteToClone))
    const noteIdx = gNotes.findIndex(note => note.id === noteToClone.id)
    clonedNote.id=utilService.makeId();
    gNotes.splice(noteIdx,0,clonedNote)
    _saveNotesToStorage()
    return Promise.resolve()
}

function _updateNote(noteToUpdate) {
    console.log('note of the todo note', noteToUpdate)
    const noteIdx = gNotes.findIndex(note => note.id === noteToUpdate.id)
    gNotes.splice(noteIdx, 1, noteToUpdate)
    _saveNotesToStorage();
    return Promise.resolve()
}



function _addNote(note) {
    const addedNote = {
        id: utilService.makeId(),
        title: note.title,
        label: '',
        type: note.type,
        isPinned: false,
        info: createNoteInfo(note),
        style: note.style ? note.style : {
             backgroundColor: '#ffffff',
            color: 'black',
            fontSize:'14px',
      
            fontFamily:'sans-serif',
            textAlign:'center'
        }
    }
    query().then((notes)=>(gNotes=notes))
    _saveNotesToStorage()
    return Promise.resolve()


}
function updateNoteStyleById(noteId, style) {
    console.log('in update style')
    console.log(style)
    const note = gNotes.find(note => noteId === note.id)
    note.style = style;
    _saveNotesToStorage();
    return Promise.resolve()
}
function updateColorById(noteId,bgColor){
    let note = gNotes.find(note => noteId === note.id)
    note=JSON.parse(JSON.stringify(note))
    note.style.backgroundColor = bgColor;
    return _updateNote(note)
}
function createNoteInfo(note) {
    switch (note.type) {
        case 'NoteImg': return _createImgInfo(note)
        case 'NoteTodo': return _createTodoInfo(note)
        case 'NoteVideo': return _createVideoInfo(note)
        case 'NoteMap': return _createMapInfo(note)
        default: return _createTextInfo(note)
    }
}
function removeNoteById(noteId) {
    const noteIdx = gNotes.findIndex(note => note.id === noteId)
    gNotes.splice(noteIdx, 1);
    _saveNotesToStorage()
    return Promise.resolve()
}
function _createTextInfo(note) {
    const addedInfo = {
        txt: note.txt
    }
    return addedInfo;
}

function _createImgInfo(note) {
    const addedInfo = {
        imgUrl: note.txt,
    }
    return addedInfo;
}
function _createTodoInfo(note) {
    if (!note.txt) note.txt = '';
    const todos = note.txt.split(',');
    const addedInfo = {
        todos: todos.map(todo => {
            return {
                id: utilService.makeId(),
                txt: todo,
                doneAt: null
            }
        })
    }
    return addedInfo;
}
function _createVideoInfo(note) {
    if (!note.txt.startsWith('https://www.youtube.com/')) return Promise.reject('Wrong Url for Video')
    const idIdx = note.txt.search('v=')
    if (idIdx === -1) return Promise.reject('could not find the video')
    const addedInfo = {
        url: note.txt,
        videoId: note.txt.substring(idIdx + 2)
    }
    return addedInfo;
}
function _createMapInfo(note) {
    const addedInfo = {
        locName: note.txt,
    }
    return addedInfo;
}
function _isNoteInFilter(note, txt) {
   
    txt = txt.toUpperCase()
    if (note.title.toUpperCase().includes(txt)) return true
    if (note.type === 'NoteText' && note.info.txt.toUpperCase().includes(txt)) return true
    if (note.type === 'NoteTodo' && note.info.todos.some(todo => todo.txt.toUpperCase().includes(txt))) return true
    return false
}

function _saveNotesToStorage(){
    storageService.saveToStorage(NOTES_KEY,gNotes)
}


