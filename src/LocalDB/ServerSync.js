// export async function syncEntities() {
//     const db = await initDB();
//     const allCommands = await db.getAll('Characters');
//     const allAnotherEntity = await db.getAll('Genres');
   
//     try {
//        const response = await fetch('/syncEntities', {
//          method: 'POST',
//          headers: {
//            'Content-Type': 'application/json',
//          },
//          body: JSON.stringify({
//            commands: allCommands,
//            anotherEntity: allAnotherEntity
//          }),
//        });
   
//        if (!response.ok) {
//          throw new Error('Network response was not ok');
//        }
   
//        // Clear local storage after successful sync
//        await db.clear('commands');
//        await db.clear('anotherEntity');
//        return true;
//     } catch (error) {
//        console.error('Error syncing entities:', error);
//        return false;
//     }
// }