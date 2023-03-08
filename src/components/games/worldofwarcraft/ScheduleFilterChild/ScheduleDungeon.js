import { FormHelperText, Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import { useState } from "react"
import wowDungeon from 'assets/game_data/wowDungeons.json'

const dungeonDifficulty = [
    {
        id: 'keystone',
        name: '신화+'
    },
    {
        id: 'mythic',
        name: '신화'
    },
    {
        id: 'heroic',
        name: '영웅'
    },
    {
        id: 'normal',
        name: '일반'
    },
]
const raidDifficulty = [
    {
        id: 'mythic',
        name: '신화'
    },
    {
        id: 'heroic',
        name: '영웅'
    },
    {
        id: 'normal',
        name: '일반'
    },
];

const ScheduleDungeon = () => {
    const [type, setType] = useState('');
    const [dungeon, setDungeon] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [goal, setGoal] = useState('');
    
    const changeTypenHandler = (e) => {
        setDifficulty('');
        setDungeon('');
        setType(e.target.value);
    }
    const changeDungeonHandler = (e) => {
        setDungeon(e.target.value);
    }
    const changeDifficultyHandler = (e) => {
        setDifficulty(e.target.value);
    }
    const changeGoalHandler = (e) => {
        setGoal(e.target.value);
    }

    const filteredGoal = () => {
    if (difficulty === 'keystone'){
        return [...Array(30)].map((v, idx) => { return { id: idx * 1 + 1, name: idx * 1 + 1 } });
        } else if (type === 'df_raid' && dungeon !== '') {
            return wowDungeon.find(v => v.id === type).instances.find(v => v.id === dungeon).boses;
        } else {
            return [{id:0, name:'none'}]
        }
    }
    return (
        <div style={{ margin: '16px 0px', display: 'flex', columnGap: '10px' }}>
            <FormControl sx={{width:'250px'}}>
                <InputLabel id="type-select-label">유형</InputLabel>
                <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={type}
                    label="타입"
                    inputProps={{
                        id: "type-select"
                    }}
                    onChange={changeTypenHandler}
                >
                    {wowDungeon.map((v) => {
                        return <MenuItem key={v.id} value={v.id}>
                            {v.name}
                        </MenuItem>
                    })}
                </Select>
                <FormHelperText></FormHelperText>
            </FormControl>
            <FormControl sx={{width:'250px'}}>
                <InputLabel id="dungeon-select-label">인스턴스</InputLabel>
                <Select
                    labelId="dungeon-select-label"
                    id="dungeon-select"
                    value={dungeon}
                    inputProps={{
                        id: "dungeon-select"
                    }}
                    label="인스턴스"
                    disabled={type === ''}
                    onChange={changeDungeonHandler}
                >
                    {type && wowDungeon.find((v)=> v.id === type).instances.map((v) => {
                        return (
                            <MenuItem key={v.id} value={v.id}>{ v.name }</MenuItem>
                        )
                    })}
                </Select>
                {type === '' && <FormHelperText sx={{color:'var(--alert-color)'}}>유형을 먼저 선택해야 합니다.</FormHelperText>}
            </FormControl>
            <FormControl sx={{ width: '250px' }}>
                <InputLabel id="difficulty-select-label">난이도</InputLabel>
                <Select
                    color='primary'
                    labelId="difficulty-select-label"
                    id="difficulty-select"
                    value={difficulty}
                    label="난이도"
                    inputProps={{
                        id: "difficulty-select"
                    }}
                    disabled={dungeon === ''}
                    onChange={changeDifficultyHandler}
                >
                    {type.includes('raid') ? raidDifficulty.map((v) => {
                        return <MenuItem key={v.id} value={v.id}>{ v.name }</MenuItem>
                    }) : dungeonDifficulty.map((v) => {
                        return <MenuItem key={v.id} value={v.id}>{ v.name }</MenuItem>
                    })}
                </Select>
                {dungeon === '' && <FormHelperText sx={{color:'var(--alert-color)'}}>인스턴스를 먼저 선택해야 합니다.</FormHelperText>}
            </FormControl>
            <FormControl sx={{ width: '250px' }}>
                <InputLabel id="goal-select-label">목표</InputLabel>
                <Select
                    color='primary'
                    labelId="goal-select-label"
                    id="goal-select"
                    value={goal}
                    label="목표"
                    inputProps={{
                        id: "goal-select"
                    }}
                    disabled={difficulty === '' || filteredGoal().length === 0}
                    onChange={changeGoalHandler}
                >
                    {filteredGoal().map((v,idx) => {
                        return <MenuItem key={`${v.id}-${idx}`} value={v.id}>{v.name}</MenuItem>
                    }) }
                </Select>
                {dungeon === '' && <FormHelperText sx={{color:'var(--alert-color)'}}>난이도를 먼저 선택해야 합니다.</FormHelperText>}
            </FormControl>
        </div>
    )

}

export default ScheduleDungeon