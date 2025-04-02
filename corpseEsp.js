import { mineshaftCheck, registerWhen } from "../coleweight/util/helperFunctions"
import { drawCoolWaypoint } from "../coleweight/util/renderUtil"


const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
let exit = false
let claimed = []
registerWhen(register("renderWorld", () => {
    const entities = World.getAllEntitiesOfType(EntityArmorStand.class).filter(a => a?.getName() == "Armor Stand" && !a.isInvisible())
      
    for(let i = 0; i < entities.length; i++)
    {
        let helmetName = new EntityLivingBase(entities[i].getEntity()).getItemInSlot(4)?.getName()?.removeFormatting()
        if (claimed.some(e => entities[i].getPos().distance(e) < 5) || !helmetName)
            continue
        let text, rgb
        switch (helmetName) {
            case "Lapis Armor Helmet":
                text = "Lapis"
                rgb = [0, 0, 1]
                break
            case "Mineral Helmet":
                text = "Tungsten"
                rgb = [1, 1, 1]
                break
            case "Yog Helmet":
                text = "Umber"
                rgb = [181/255, 98/255, 34/255]
                break
            case "Vanguard Helmet":
                text = "Vanguard"
                rgb = [242/255, 36/255, 184/255]
                break
            default:
                continue
        }

        drawCoolWaypoint(Math.floor(entities[i].getRenderX()), Math.floor(entities[i].getRenderY()), Math.floor(entities[i].getRenderZ()),
            rgb[0], rgb[1], rgb[2], {name: text, showDist: true}
        )
    }
}), () => { return true && mineshaftCheck.check() })


register("chat", (corpse) => {
    claimed.push(Player.asPlayerMP().getPos())
}).setCriteria(/\s(.+) CORPSE LOOT!\s/)


register("worldUnload", () => {
  exit = false
  claimed.length = 0
})