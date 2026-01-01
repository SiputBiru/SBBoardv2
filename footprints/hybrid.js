module.exports = {
  params: {
    designator: 'S',
    side: 'F',
    reversible: false,
    P1: { type: 'net', value: 'P1' },
    P2: { type: 'net', value: 'P2' }
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

    const common_start = `
    (footprint "SW_MX_Kailh_Choc_V1V2_HotSwap_Hybrid"
      (layer "${p.side}.Cu")
      ${p.at /* This handles position AND rotation for the whole footprint */}
      (property "Reference" "${p.ref}"
        (at 0 -8.5 0)
        (layer "${p.side}.SilkS")
        ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
      )
      (attr smd)
    `

    // 3. Common Holes: These go through the board (NPTH), so they are always present
    const common_holes = `
      (pad "" np_thru_hole circle (at -5.5 0) (size 1.7 1.7) (drill 1.7) (layers "*.Cu" "*.Mask"))
      (pad "" np_thru_hole circle (at -5.08 0) (size 1.7 1.7) (drill 1.7) (layers "*.Mask"))
      (pad "" np_thru_hole circle (at -3.81 -2.54) (size 3 3) (drill 3) (layers "*.Mask"))
      (pad "" np_thru_hole circle (at 0 0) (size 5 5) (drill 5) (layers "*.Mask"))
      (pad "" np_thru_hole circle (at 2.54 -5.08) (size 3 3) (drill 3) (layers "*.Mask"))
      (pad "" np_thru_hole circle (at 5.08 0) (size 1.7 1.7) (drill 1.7) (layers "*.Mask"))
      (pad "" np_thru_hole circle (at 5.5 0) (size 1.7 1.7) (drill 1.7) (layers "*.Cu" "*.Mask"))
    `

    // 4. Front Side Definitions
    const silkscreen_front = `
      (fp_line (start -6.5 -5.5) (end -6.5 -6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
      (fp_line (start -6.5 6.5) (end -6.5 5.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
      (fp_line (start -6.5 6.5) (end -5.5 6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
      (fp_line (start -5.5 -6.5) (end -6.5 -6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
      (fp_line (start 5.5 6.5) (end 6.5 6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
      (fp_line (start 6.5 -6.5) (end 5.5 -6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
      (fp_line (start 6.5 -6.5) (end 6.5 -5.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
      (fp_line (start 6.5 5.5) (end 6.5 6.5) (stroke (width 0.14) (type solid)) (layer "F.SilkS") )
    `
    const pads_front = `
      (pad "1" thru_hole circle (at 5 -5.15) (size 1.45 1.45) (drill 1) (layers "*.Cu" "B.Mask") ${net_P1})
      (pad "1" smd roundrect (at 3.7 5.9) (size 2.6 2.6) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.2) ${net_P1})
      (pad "1" smd roundrect (at 6.29 -5.08 180) (size 2.5 2.55) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.2) ${net_P1})
      (pad "2" smd roundrect (at -8.7 3.8) (size 2.6 2.6) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.2) ${net_P2})
      (pad "2" smd roundrect (at -7.56 -2.54 180) (size 2.5 2.55) (layers "F.Cu" "F.Paste" "F.Mask") (roundrect_rratio 0.2) ${net_P2})
    `

    // 5. Back Side Definitions (Mirrored)
    const silkscreen_back = `
      (fp_line (start -6.5 -5.5) (end -6.5 -6.5) (stroke (width 0.14) (type solid)) (layer "B.SilkS") )
      (fp_line (start -6.5 6.5) (end -6.5 5.5) (stroke (width 0.14) (type solid)) (layer "B.SilkS") )
      (fp_line (start -6.5 6.5) (end -5.5 6.5) (stroke (width 0.14) (type solid)) (layer "B.SilkS") )
      (fp_line (start -5.5 -6.5) (end -6.5 -6.5) (stroke (width 0.14) (type solid)) (layer "B.SilkS") )
      (fp_line (start 5.5 6.5) (end 6.5 6.5) (stroke (width 0.14) (type solid)) (layer "B.SilkS") )
      (fp_line (start 6.5 -6.5) (end 5.5 -6.5) (stroke (width 0.14) (type solid)) (layer "B.SilkS") )
      (fp_line (start 6.5 -6.5) (end 6.5 -5.5) (stroke (width 0.14) (type solid)) (layer "B.SilkS") )
      (fp_line (start 6.5 5.5) (end 6.5 6.5) (stroke (width 0.14) (type solid)) (layer "B.SilkS") )
    `
    const pads_back = `
      (pad "1" thru_hole circle (at 5 -5.15) (size 1.45 1.45) (drill 1) (layers "*.Cu" "B.Mask") ${net_P1})
      (pad "1" smd roundrect (at 3.7 5.9) (size 2.6 2.6) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.2) ${net_P1})
      (pad "1" smd roundrect (at 6.29 -5.08 180) (size 2.5 2.55) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.2) ${net_P1})
      (pad "2" smd roundrect (at -8.7 3.8) (size 2.6 2.6) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.2) ${net_P2})
      (pad "2" smd roundrect (at -7.56 -2.54 180) (size 2.5 2.55) (layers "B.Cu" "B.Paste" "B.Mask") (roundrect_rratio 0.2) ${net_P2})
    `

    const common_end = `
    )
    `

    // 6. Logic: Assemble the string
    let final = common_start;
    final += common_holes;

    // Add Front elements if side is Front OR Reversible
    if (p.side == "F" || p.reversible) {
        final += pads_front;
        final += silkscreen_front;
    }

    // Add Back elements if side is Back OR Reversible
    if (p.side == "B" || p.reversible) {
        final += pads_back;
        final += silkscreen_back;
    }

    final += common_end;
    return final;
  }
}