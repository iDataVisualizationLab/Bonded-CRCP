import {Grid, Hidden, Input, Slider} from "@material-ui/core";
import React from "react";


export default function ComtrolwithSlider(props){
    const {classes,title,value,setValue,id,min,textField,max,step,...other} = props;
    const handleChangeSliderInput = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlurSliderInput = (min, max) => {
        if (value < min) {
            setValue(min);
        } else if (value > max) {
            setValue(max);
        }
    }
    return <>
        <Grid item xs={8} justify="flex-start">
            <Grid container xs={12} justify="flex-start">
                <span>{title}</span>
                <span className={classes.dot} style={{flexGrow: 1}}/>
            </Grid>
        </Grid>
        <Hidden smDown>
            <Grid item xs={3} sm={4} md={3}>
                <Slider
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                    id={id}
                    min={min} max={max}
                    step={step}
                />
            </Grid>
        </Hidden>
        <Grid item xs={1}>
            <Input
                value={value}
                onChange={(event) => handleChangeSliderInput(event)}
                onBlur={() => handleBlurSliderInput(min, max)}
                id={id}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    min: min,
                    max: max,
                    step:step,
                    type: 'number',
                }}
            />
        </Grid>
    </>
}
