module.exports = {
  params: {
    designator: 'S',
    side: 'F',
    reversible: false,
    show_3d: true,
    P2: undefined,
    P1: undefined,
    rot: 0 
  },
  body: p => {
    const get_net = (net_param) => {
        if (net_param && typeof net_param === 'object' && net_param.str) {
            return net_param.str;
        }
        return '';
    };

    const net_P1 = get_net(p.P1);
    const net_P2 = get_net(p.P2);

    const standard_opening = `(
        footprint "SW_MX_Kailh_Choc_V1V2_HotSwap_Hybrid"
        (version 20221018)
        (generator "ergogen")
        (layer "${p.side}.Cu")
        ${p.at /* This inserts the (at x y rot) command */}
        (descr "Hybrid Switch Footprint")
        (tags "switch")
        (property "Reference" "${p.ref}" (at 0 -8.5 ${0 + p.rot}) (unlocked yes) (layer "${p.side}.SilkS") ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
        (attr smd)
    `

    const front_silkscreen = `
        (fp_line (start -6.5 -5.5) (end -6.5 -6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
        (fp_line (start -6.5 6.5) (end -6.5 5.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
        (fp_line (start -6.5 6.5) (end -5.5 6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
        (fp_line (start -5.5 -6.5) (end -6.5 -6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
        (fp_line (start 5.5 6.5) (end 6.5 6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
        (fp_line (start 6.5 -6.5) (end 5.5 -6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
        (fp_line (start 6.5 -6.5) (end 6.5 -5.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
        (fp_line (start 6.5 5.5) (end 6.5 6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
    `

    const front_fabrication = `
        (fp_rect (start -7.5 -7.5) (end 7.5 7.5) (stroke (width 0.1) (type solid)) (fill no) (layer "F.Fab") )
    `
    
    const pads = `
        (pad "" np_thru_hole circle (at -5.5 0 ${p.rot}) (size 1.7 1.7) (drill 1.7) (layers "*.Cu" "*.Mask") )
        (pad "" np_thru_hole circle (at -5.08 0 ${180 + p.rot}) (size 1.7 1.7) (drill 1.7) (layers "*.Mask") )
        (pad "" np_thru_hole circle (at -3.81 -2.54 ${180 + p.rot}) (size 3 3) (drill 3) (layers "*.Mask") )
        (pad "" np_thru_hole circle (at 0 0 ${180 + p.rot}) (size 5 5) (drill 5) (layers "*.Mask") )
        (pad "" np_thru_hole circle (at 2.54 -5.08 ${180 + p.rot}) (size 3 3) (drill 3) (layers "*.Mask") )
        (pad "" np_thru_hole circle (at 5.08 0 ${180 + p.rot}) (size 1.7 1.7) (drill 1.7) (layers "*.Mask") )
        (pad "" np_thru_hole circle (at 5.5 0 ${p.rot}) (size 1.7 1.7) (drill 1.7) (layers "*.Cu" "*.Mask") )
        (pad "1" thru_hole circle (at 5 -5.15 ${p.rot}) (size 1.45 1.45) (drill 1) (layers "*.Cu" "B.Mask") ${net_P1})
    `

    const back_silkscreen = `
        (fp_line (start -7.275 5.775) (end -7.275 1.825) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start -6.9 1.45) (end -3.425 1.45) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start -6.9 6.15) (end -4.600195 6.15) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start -6.1 -3.8) (end -6.1 -4.7) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start -6.1 -0.9) (end -6.1 -1.3) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start -6.1 -0.9) (end -4.8 -0.900001) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start -4.1 -6.7) (end 1.4 -6.7) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start -2.475 8.25) (end -2.975 7.75) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start -1.325 3.55) (end 1.775 3.55) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start 1.775 8.25) (end -2.475 8.25) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start 2.275 4.05) (end 1.775 3.55) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start 2.275 4.05) (end 2.275 7.75) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start 2.275 7.75) (end 1.775 8.25) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start 3.7 -6.7) (end 4.8 -6.7) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start 4.3 -2.8) (end 0.2 -2.8) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start 4.8 -6.7) (end 4.8 -6.3) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
        (fp_line (start 4.8 -3.8) (end 4.8 -3.3) (stroke (width 0.1) (type default)) (layer "B.SilkS") )
    `

    const back_pads = `
        (pad "" np_thru_hole circle (at -5 3.8 ${p.rot}) (size 3 3) (drill 3) (layers "F&B.Cu" "*.Mask") )
        (pad "" np_thru_hole circle (at 0 5.9 ${p.rot}) (size 3 3) (drill 3) (layers "F&B.Cu" "*.Mask") )
        (pad "1" smd roundrect (at 3.7 5.9 ${p.rot}) (size 2.6 2.6) (layers "B.Cu" "B.Mask" "B.Paste") (roundrect_rratio 0.2) ${net_P1})
        (pad "1" smd roundrect (at 6.29 -5.08 ${180 + p.rot}) (size 2.5 2.55) (layers "B.Cu" "B.Mask" "B.Paste") (roundrect_rratio 0.2) ${net_P1})
        (pad "2" smd roundrect (at -8.7 3.8 ${p.rot}) (size 2.6 2.6) (layers "B.Cu" "B.Mask" "B.Paste") (roundrect_rratio 0.2) ${net_P2})
        (pad "2" smd roundrect (at -7.56 -2.54 ${180 + p.rot}) (size 2.5 2.55) (layers "B.Cu" "B.Mask" "B.Paste") (roundrect_rratio 0.2) ${net_P2})
    `

    const back_fabrication = `
        (fp_line (start -6.1 -0.9) (end -6.1 -4.7) (stroke (width 0.1) (type default)) (layer "B.Fab") )
        (fp_line (start -6.1 -0.9) (end -2.8 -0.900001) (stroke (width 0.1) (type default)) (layer "B.Fab") )
        (fp_line (start -4.1 -6.7) (end 4.8 -6.7) (stroke (width 0.1) (type default)) (layer "B.Fab") )
        (fp_line (start 4.3 -2.8) (end 0.2 -2.8) (stroke (width 0.1) (type default)) (layer "B.Fab") )
        (fp_line (start 4.8 -6.7) (end 4.8 -3.3) (stroke (width 0.1) (type default)) (layer "B.Fab") )
    `

    let final = standard_opening;
    final += front_silkscreen;
    final += front_fabrication;
    final += pads;
    final += back_silkscreen;
    final += back_pads;
    final += back_fabrication;
    
    final += `
        )
    `;

    return final;
  }
}